const mongoose=require('mongoose')
const coverImageBasePath='uploads/bookCovers'
const path=require('path')

const BookSchema=mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
},
publishedDate:{
    type:Date,
    required:true
},
pageCount:{
    type:Number,
    required:true
},
createdAt:{
    type:Date,
    required:true,
    default:Date.now
},
coverImageName:{
    type:String,
    required:true,

},
author:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Author'
}
})
BookSchema.virtual('coverImagePath').get(function(){
    console.log(this.coverImageName)
    if(this.coverImageName!=null){
       // console.log( path.join('/',coverImageBasePath,this.coverImageName))
        return path.join('/',coverImageBasePath,this.coverImageName)
    }
})

module.exports=mongoose.model('Book',BookSchema)
module.exports.coverImageBasePath=coverImageBasePath