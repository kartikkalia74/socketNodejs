import io from 'socket.io-client';
const socket = io.connect('http://localhost:4001')


export const sendMessage = (sender,reciever,message,chatId,cb)=>{
    console.log(sender,reciever ,message,`'${chatId}-chat'`,'coneection')
    socket.emit(`'111-chat'`,{sender,reciever,message,chatId})
    socket.on(`'${chatId}-new'`,function(data){
        console.log(data,'popo')
        cb(data)
    })
}

    export const recieveMessage =(cb)=>
        socket.on('chatt',function(data){
            console.log(data,'data')
        cb(data)
    })
    export const chat =(senderId,message,recieverId)=>{
        socket.emit('chatmessage',{senderId,message,recieverId})
    }
    export const recieveChatId =(cb)=>{
        socket.on('recieverRecieved',function(chatId){
            cb(chatId)
        })
    }

export const users =(user,cb)=>{
    socket.emit('userList',user)
    socket.on('users',function(dataList){
        console.log(dataList)
        cb(dataList)
    })
}
export const sender =(senderId)=>{
    console.log(senderId,'connection')
    socket.emit('sender',senderId)
}

export const initials = (cb)=>{
    socket.emit('initials','dsf')
    socket.on('chatName',function(memberNames){
        console.log(memberNames,'klkl')
        cb(memberNames)
    })
}
export const initalChat = ()=>{
    socket.emit('initialChat','getMessages')
    socket.on('')
}
export const recieverName =(recieverName)=>{
    socket.emit('sendReciever',recieverName)

}