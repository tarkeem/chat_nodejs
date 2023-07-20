
const message=require('../moduls/message').savemessage
var availableUsers=[];
exports.chatSocket=io=>{
    io.on('connection',clie=>{
        console.log('new client');
        clie.on('new user',data=>{
            data.clieid=clie.id
            availableUsers.push(data);
            io.emit('new user',availableUsers);
        })
        clie.on('joinroom',data=>{
            console.log('join room')
            console.log(data)
            clie.join(data)
        })
        clie.on('send',data=>{
            message(data)
            console.log('send')
            console.log(data)
            io.to(data.chatid).emit('recieve',data)
        })
        clie.on('disconnect',()=>{
            console.log(availableUsers)
          
            
            availableUsers.forEach((value, index, array)=> {
                console.log('.......................')
                console.log(clie.id)
                console.log(value.clieid)
                console.log('.......................')
                if(value.clieid==clie.id)
                {
                    console.log('remove user...')
                    console.log(index)
                    availableUsers.slice(index,1)
                }
                console.log(availableUsers)
              })

        })
    })
}