const express=require('express')
const router=express.Router()
const Author=require('../model/author')
const Book=require('../model/book')
//const multer=require('multer')
const path=require('path')
const fs=require('fs')
const book1=[
  {title:"asir"},
  {title:"abm"}
]
//const uploadPath=path.join('public',Book.coverImageBasePath)
const imageMimeTypes=['image/jpeg','image/png','image/gif']

/*const upload=multer({
  dest:uploadPath,
  fileFilter:(req,file,callback)=>{
    callback(null,imageMimeTypes.includes(file.mimetype))

  }

})*/

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

router.post('/all'/*,upload.single('cover')*/,async(req,res)=>{
  //console.log(JSON.parse(req.body.cover))
  const fileName=req.file!=null?req.file.filename:null
  const book=new Book({
    title:req.body.title,
    author:req.body.author.trim(),
    publishedDate:req.body.publishedDate,
    pageCount:req.body.pageCount,
    //coverImageName:fileName,
    //coverImage:10101010101010,
    //coverImageType:'jkcnjka',
    description:req.body.description
  })
  //console.log(req.body.cover)
  saveBookCover(book,req.body.cover)

try{
  const newBook=await book.save()
  res.redirect(`/book/${newBook.id}`)
}
catch(e){
  if(fileName!=null){
    removeBookCover(filename)
  }
  console.log(e)
  renderNewPage(res,book,e)
}

    
      
})

function saveBookCover(book,coverEncoded){
  if (coverEncoded ==null) return
  const cover=JSON.parse(coverEncoded)
  if(cover!=null && imageMimeTypes.includes(cover.type)){
    book.coverImage=new Buffer.from(cover.data,'base64')
    book.coverImageType=cover.type
  }


} 

router.get('/:id',async(req,res)=>{
  try{
    const book=await Book.findById(req.params.id).populate('author').exec()
    res.render('book/show',{
      book:book
    })
  }
  catch(e){

  }
})


async function renderNewPage(res,book,hasError=false){
  renderFormPage(res,book,'new',hasError)

}
async function renderEditPage(res,book,hasError=false){
  renderFormPage(res,book,'edit',hasError)
}


async function renderFormPage(res,book,form,hasError=false){
  try{
    const authors=await Author.find({})
   console.log(book.publishedDate)
   console.log(book.pageCount)
    const params={
      authors:authors,
      book:book
    }
    if(hasError){
      if(form=='edit'){
        params.errorMessage="Error updating book"
      }
      else{
        params.errorMessage="Error creating book"
      }
    } 
    
    
    res.render(`book/${form}`,params)
   }
   catch(e){
    
     res.redirect('/book/all')
   }

}







router.delete('/:id',async(req,res)=>{
  let book;
  try{
     book=await Book.findById(req.params.id)
     await book.remove()
     res.redirect('/book/all')
  }
  catch(e){
    if(book!=null){
     res.render('book/show',{
      book:book,
      errorMessage:'Could not remove book'
     })
    }
    else{
    res.redirect('/')
    }

  }
})


router.get('/:id/edit',async(req,res)=>{
  let book;
  try{
  book=await Book.findById(req.params.id)
  //console.log(book)
  }
  catch(e){

  }
  renderEditPage(res,book)

})

router.put('/:id',async(req,res)=>{
let book
try{
  book=await Book.findById(req.params.id.trim())
  book.title=req.body.title
  book.author=req.body.author
  book.publishedDate=new Date(req.body.publishedDate)
  book.description=req.body.description
  if(req.body.cover!=null && req.body.cover){
    saveBookCover(book,req.body.cover)
  }
  await book.save()
  res.redirect(`/book/${book.id}`)
}
catch(e){
  if(book!=null){
    console.log(e)
    renderEditPage(res,book,true)
  }
  else{
    redirect('/')
  }
 
}

    
      
})



module.exports=router