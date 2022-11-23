if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}


const express=require('express')
const mongoose=require('mongoose')
const userRoutes=require('./Routes/users')
const authorRoutes=require('./Routes/authors')
const bookRoutes=require('./Routes/books')
const methoOverride=require('method-override')

const bodyParser=require('body-parser')
const app=express()
var path = require ('path');
const expressLayouts=require('express-ejs-layouts')


app.set('view engine','ejs')
app.set('views','./views')
app.set('layout','layouts/layout')
app.use(methoOverride('_method'))
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/',userRoutes)
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))

app.use('/author',authorRoutes)
app.use('/book',bookRoutes)
app.listen(process.env.PORT||3002)

//db_url='mongodb+srv://Asir:QFuI32ybPWMnXdXk@cluster0.h60upyz.mongodb.net/?retryWrites=true&w=majority';
//process.env.DATABASE_URL
mongoose.connect(process.env.DATABASE_URL,()=>{
 console.log('conected')
},(err)=>{
 console.log('Hello')
})


