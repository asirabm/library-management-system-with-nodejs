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
        console.log(books)
        if(err){
            next(err)
        }
        else if(books.length>0){
            next(new Error('This Author has book still'))
        }
        else{
            next()
        }
    })
    next()
})

module.exports=mongoose.model('Author',authorSchema)