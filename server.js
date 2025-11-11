const express = require('express')
const app = express()
require('dotenv').config()
const {sessionObj} = require('./config/googleConfig')
const session = require('express-session')
const {errorHandler} = require('./utils/error')
//routes
const authRoute =  require('./routes/authRoute')
const unitRoute = require('./routes/unitRoute')
const categoriesRoute = require('./routes/categoriesRoute')
const productRoute = require('./routes/productRoute')
const discountRoute = require('./routes/discountRoute')


//middlewares
app.use(express.json())
app.use(session(sessionObj))


//api's
app.use('/auth',authRoute)
app.use('/units',unitRoute)
app.use('/categories',categoriesRoute)
app.use('/product',productRoute)
app.use('/disocunt',discountRoute)


//error handler
app.use(errorHandler)


//server
app.listen(process.env.PORT,()=>{
    console.log("server is running on http://localhost:3000")
})