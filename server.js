const express = require('express')
const app = express()
require('dotenv').config()
const {sessionObj} = require('./config/googleConfig')
const session = require('express-session')
const {errorHandler} = require('./utils/error')
//routes
const authRoute =  require('./routes/authRoute')



//middlewares
app.use(express.json())
app.use(session(sessionObj))


//api's
app.use('/auth',authRoute)

app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log("server is running on http://localhost:3000")
})