const express = require('express')
const app = express()
const mongan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

const auth = require('./middlewares/auth')

require('dotenv').config()

const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')

const mongoose = require('mongoose')
const morgan = require('morgan')

//some middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//db 
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false 
}).then(()=>console.log('DB connected')); 


app.use('/api', userRoute)
app.use('/api', categoryRoute)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})