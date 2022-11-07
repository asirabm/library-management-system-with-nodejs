const express=require('express')
const router=express.Router()
const Author=require('../model/author')

//GEt All Authers
router.get('/all',async(req,res)=>{
let searchOptions={};
if(req.query.name!=null && req.query.name!==''){
    searchOptions.name=new RegExp(req.query.name,'i')
    console.log(searchOptions)
}


    try{
        const authors=await Author.find(searchOptions)
        //console.log(authors)
        res.render('author/index',{
            authors:authors,
            searchOptions:req.query
        })
    }
    catch(e){
         res.redirect('/')
    }

    //res.render('author/index')
})




//new Author
router.get('/new',(req,res)=>{
    res.render('author/new',{Author:new Author()})
})





router.post('/',async(req,res)=>{
    const author=new Author({
        name:req.body.name
    })
    try{
        const saved=await author.save()
        res.redirect('author/all')
    }
    catch(err){
       res.render("author/new",{
           author:author,
           errorMessage:"error on creating author"
       })
    }
      
})

module.exports=router