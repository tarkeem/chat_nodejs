const mongoose=require('mongoose')



const chatSchema=mongoose.Schema({
    users:[String],
})


let Chat=mongoose.model('chat',chatSchema)
exports.chat=Chat;

exports.getchat=async data=>{

    let res=await Chat.findOne({

        $or:[{users:[data.first,data.second]},{users:[data.second,data.first]}]
        ,
    })
    
    if(res)
    {
        console.log('found')
        
        return res
    }
    else
    {

        console.log('not found')
            var newchat= Chat({
                users:[data.first,data.second]
            })
           let res=await newchat.save()

           return res
    }
   


    /*then((doc) => {
        if (!doc) {
            console.log('not found')
            var newchat= Chat({
                users:[data.first,data.second]
            })
            newchat.save().then(res=>{ return res});
           
        } else{
            console.log('found')
            return doc;
        }
    });*/
    
}