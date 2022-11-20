const mongoose=require('mongoose')
const authorSchema=mongoose.Schema({
name:{
    type:String,
    required:true
},
filename:{
    type:String,
}
})

module.exports=mongoose.model('Author',authorSchema)