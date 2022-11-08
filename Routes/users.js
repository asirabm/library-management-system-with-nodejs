const express=require('express')
//const { route } = require('express/lib/application')
const router=express.Router()
/*
router.get('/',(req,res)=>{
    res.send('All users')
})*/
router.get('/new',(req,res)=>{
    res.send('New User added')
})


router.get('/',(req,res)=>{
    res.render('main')
})

//always put dynamic routs below
router.get('/:id',(req,res)=>{
    console.log(req.params.id)
    res.send(req.params.id)
})



module.exports=router