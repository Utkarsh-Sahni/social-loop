const cors = require('cors')
const dotenv= require('dotenv')
const express= require('express')
const mongoose  = require('mongoose')
const app= express()

app.use(cors())

dotenv.config({path : '../config.env'});

//Database connection
require('./db/conn');

app.use(express.json())
const USER= require('./model/userSchema')

app.use(require('./router/auth'))

const PORT = process.env.PORT


// const middleware = (req,res,next) =>{
//     console.log("middleware")
//     next()
// }

// app.get('/', (req,res) => {
//     res.send("Hello from server")
// })

app.listen(PORT, ()=>{
    console.log(`listening at port ${PORT}`)
})