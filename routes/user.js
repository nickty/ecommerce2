const express = require('express')
const router = express.Router()
const {userSignupValidator} = require('../validator')

const {signup, signin, userById} = require('../controllers/users') 

const {isAdmin} = require('../middlewares/admin')

const auth = require('../middlewares/auth')


router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)


router.param('userId', userById)
router.get('/secret/:userId', auth, isAdmin, (req, res) => {

    res.json({
        user:req.profile
    })
} )


module.exports = router