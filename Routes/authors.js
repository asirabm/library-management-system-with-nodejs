const express=require('express')
const router=express.Router()

//GEt All Authers
router.get('/',(req,res)=>{
    res.render('author/index')
})

//new Author
router.get('/new',(req,res)=>{
    res.render('author/new')
})

router.post('/',(req,res)=>{
    res.send('created')
})

module.exports=router