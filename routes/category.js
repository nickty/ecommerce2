const express = require('express')
const router = express.Router()

const {signup, signin, userById} = require('../controllers/users') 

const {create} = require('../controllers/category')

const {isAdmin} = require('../middlewares/admin')

const auth = require('../middlewares/auth')

router.param('userId', userById)

router.post('/category/create/:userId', auth, isAdmin, create)

module.exports = router