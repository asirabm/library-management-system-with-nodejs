const express=require('express')
//const { route } = require('express/lib/application')
const router=express.Router()
const Book=require('../model/book')
/*
router.get('/',(req,res)=>{
    res.send('All users')
})*/
router.get('/new',(req,res)=>{
    res.send('New User added')
})


router.get('/',async(req,res)=>{
    let books
  try{

    books= await Book.find().sort({
        createAt:'desc'
    }).limit(5).exec()
    //console.log(books)

 

  }
  catch(e){
   console.log(e.message)
  }
  res.render('main',{
    books:books
})
   


})

//always put dynamic routs below
router.get('/:id',(req,res)=>{
    //console.log(req.params.id)
    res.send(req.params.id)
})



module.exports=router