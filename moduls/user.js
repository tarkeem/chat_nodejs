const mongoose=require('mongoose')



const userSchema=mongoose.Schema({
    userName:String,
    image:String,
    password:String
    
})


exports.User=mongoose.model('users',userSchema)