const mongoose=require('mongoose')



const messageSchema=mongoose.Schema({
    chatId:String,
    sender:String,
    msg:String
})

let Message=mongoose.model('message',messageSchema)
exports.message=Message

exports.savemessage=data=>{
    let newmessage=Message({
        chatId:data.chatid,
        sender:data.sender,
        msg:data.msg
    })
    newmessage.save()
}