const express=require('express')
const router=express.Router()
const Author=require('../model/author')
const book=require('../model/book')




//GEt All Authers
router.get('/all',async(req,res)=>{
let searchOptions={};
if(req.query.name!=null && req.query.name!==''){
    searchOptions.name=new RegExp(req.query.name,'i')
   //console.log(searchOptions)
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
         res.redirect('/all')
    }

    //res.render('author/index')
})


//new Author
router.get('/new',(req,res)=>{
    res.render('author/new',{author:new Author()})
})

router.post('/all',async(req,res)=>{
    const author=new Author({
        name:req.body.name,
        filename:req.body.uploadfile
    })
    try{
       // console.log(req.body.uploadfile)
        const saved=await author.save()
        res.redirect('/author/all')
    }
    catch(err){
       res.render("author/new",{
           author:author,
           errorMessage:err
       })
    }
      
})

router.get('/:id',async(req,res)=>{
    console.log('helllllllllllllllllllllllllllllllll')
    try{
     const author=await Author.findById(req.params.id.trim())
     const books=await book.find({author:author.id}).limit(6).exec()
     res.render('author/show',{
        author:author,
        bookByAuthor:books
     })
    }
    catch(e){
        console.log(e.message)
     res.redirect('/')
    }
    
    
    //res.send(`Show Author ${req.params.id}`)
})

router.get('/:id/edit',async(req,res)=>{
    let author;
    try{
     author=await Author.findById(req.params.id)
     res.render('author/edit',{author:author})

    }
    catch(e){
     res.redirect('author/all')
    }

    
  
    //res.send(`Edit Author ${req.params.id}`)
})

router.put('/:id',async(req,res)=>{
    //console.log(await Author.findById((req.params.id).toString()))
    let author;
    try{
    author =await Author.findById(req.params.id.trim())
    
    author.name=req.body.name
    await author.save()
    res.redirect(`/author/${author.id}`)
    }
    catch(e){
        console.log(author)
        if(author==null){
            res.redirect('/author/all')
        }
        else{
        res.render('/author/edit',{
            author:author,
            errorMessage:'error updating author'

        })
        }

    }
    //res.send(`Update Author ${req.params.id}`)
})
router.delete('/:id',async(req,res)=>{
    let books
    let author;
    try{
    author =await Author.findById(req.params.id.trim())
   
    
    //author.name=req.body.name
    await author.remove()
    res.redirect(`/author/all`)
    }
    catch(e){
        console.log(author)
        if(author==null){
            res.redirect('/')
        }
        else{
       //res.redirect(`/author/${author.id}`)

        try{
            books=await book.find({author:author.id}).limit(6).exec()
        }
        catch{

        }

       
       res.render('author/show',{
          author:author,
          bookByAuthor:books,
          errorMessage:e.message

       })
        }

    }
})


module.exports=router