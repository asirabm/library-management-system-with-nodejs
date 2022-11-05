if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}


const express=require('express')
const mongoose=require('mongoose')
const userRoutes=require('./Routes/users')
const app=express()
var path = require ('path');
const expressLayouts=require('express-ejs-layouts')

app.set('view engine','ejs')
app.set('views','./views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/user',userRoutes)
app.listen(process.env.PORT||3000)


mongoose.connect(process.env.DATABASE_URL,()=>{
 console.log('conected')
},(err)=>{
 console.log('Hello')
})
