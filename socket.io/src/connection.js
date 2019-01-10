import io from 'socket.io-client';
const socket = io.connect('http://localhost:4001')


export const sendMessage = (reciever,sender,message,cb)=>{
    console.log(sender,reciever ,message)
    socket.emit('chat',{sender,reciever,message})
    socket.on('chatt',function(data){
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

export const senderName = (cb)=>{
    socket.emit('askName','dsf')
    socket.on('send',function(senderName){
        console.log(senderName,'klkl')
        cb(senderName)
    })
}
