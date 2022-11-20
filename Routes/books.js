const express=require('express')
const router=express.Router()
const Author=require('../model/author')
const Book=require('../model/book')
const multer=require('multer')
const path=require('path')
const fs=require('fs')
const book1=[
  {title:"asir"},
  {title:"abm"}
]
const uploadPath=path.join('public',Book.coverImageBasePath)
const imageMimeTypes=['image/jpeg','image/png','image/gif']
const upload=multer({
  dest:uploadPath,
  fileFilter:(req,file,callback)=>{
    callback(null,imageMimeTypes.includes(file.mimetype))

  }

})

//GEt All Authers
router.get('/all',async(req,res)=>{
  const query=Book.find()
  

  //let searchOptions={};
  if(req.query.title!=null && req.query.title!==''){
    quety=query.regex('title',new RegExp(req.query.title,'i'))
    }

    if(req.query.publishedAfter!=null && req.query.publishedAfter!==''){
      quety=query.gte('publishedDate',req.query.publishedAfter)
      }

      if(req.query.publishedBefore!=null && req.query.publishedBefore!==''){
        quety=query.lte('publishedDate',req.query.publishedBefore)
        }


    

  try{
    const books=await query.exec()
        //console.log(authors)
        res.render('book/index',{
            books:books,
            searchOptions:req.query
        })

  }
  catch(e){
    res.redirect('/all')
  }
  
})


//new Author
router.get('/new',async(req,res)=>{
  renderNewPage(res,new Book())

})

router.post('/all',upload.single('cover'),async(req,res)=>{
  console.log(req.body.publishedDate)
  const fileName=req.file!=null?req.file.filename:null
  //console.log(fileName)
  const book=new Book({
    title:req.body.title,
    author:req.body.author.trim(),
    publishedDate:req.body.publishedDate,
    pageCount:req.body.pageCount,
    coverImageName:fileName,
    description:req.body.description
  })
try{
  const newBook=await book.save()
  res.redirect('/book/all')
}
catch(e){
  if(fileName!=null){
    removeBookCover(filename)
  }

  renderNewPage(res,book,e)
}

    
      
})

async function renderNewPage(res,book,hasError=false){

  try{
    const authors=await Author.find({})

    const params={
      authors:authors,
      book:book
    }
    if(hasError) params.errorMessage="Error creating book"
    res.render('book/new',params)
   }
   catch(e){
     res.redirect('/book/all')
   }
}

function removeBookCover(filename){
  fs.unlink(path.join(uploadPath,filename),(err)=>{
    if(err) console.error(err)
  })
}




module.exports=router