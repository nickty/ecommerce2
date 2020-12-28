const Category = require('../models/category')
const {errorHandler} = require("../helpers/dbErrorHandlers")


exports.create = (req, res, next, id)=> {

    const category = new Category(req.body)

    console.log(category)

    category.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({data})
    })

} 