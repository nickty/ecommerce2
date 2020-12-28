const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const {errorHandler} = require("../helpers/dbErrorHandlers")


exports.signup = async (req, res) => {
    
    const user = new User(req.body); 

    const salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash(user.password, salt)

    await user.save((err, userFromDB) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }

        user.salt = undefined
        user.password = undefined

        res.json({
            userFromDB
        })
    })

    //res.json({user})

}

exports.signin = async (req, res) => {
    //find the user base of email 

    const {email,  password} = req.body

    

    const user = await User.findOne({email}, (err, user)=> {
        if(err || !user) {
            return res.status(400).json({
                err: 'User with that email does not exist'
            })
        }

        //if user if foudn make sure the email and password match

    
           

    })

    

    const isMatch = await bcrypt.compare(password, user.password)

    //res.send(isMatch)

    if(!isMatch){
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]})    
    }
    

    //return jsonwebtoken

    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(payload, process.env.Secret, {expiresIn: 360000}, (err, token) => {
        if(err){
            throw err; 
        } else {
            res.json({token})
        }
    })
    

}

exports.userById = (req, res, next, id)=> {

    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }

        req.profile = user
        next(); 
    })

} 