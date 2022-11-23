const mongoose=require('mongoose')
const book=require('../model/book')
const authorSchema=mongoose.Schema({
name:{
    type:String,
    required:true
},
filename:{
    type:String,
}
})



authorSchema.pre('remove',function(next){
    book.find({author:this.id},(err,books)=>{
        console.log(books.length)
        if(err){
            next(err)
        }
        else if(books.length>0){
            console.log('This author has book still')
            next(new Error('This Author has book still'))
        }
        else{
            next()
        }
    })
   
})

module.exports=mongoose.model('Author',authorSchema)