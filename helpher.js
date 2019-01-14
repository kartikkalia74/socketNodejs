const {user} = require('./models/user');
const  {chat} = require('./models/chat');
const {message} = require('./models/message');


const helphers ={};
helphers.members= function(senderName,recieverName,cb){
    user.findOne({name:senderName},'_id',function(err,sender){
        if(!err){
            user.findOne({name:recieverName},'_id',function(err,reciever){
                if(!err){
                    console.log(sender,reciever,'senderreciever')
                    cb(sender._id,reciever._id)
                }else{console.log(err)}
            })
        }
    })
}
helphers.saveMessage = function(senderId,recieverId,messageString,cb){
    const newMessage = new message({sender:senderId,reciever:recieverId,message:messageString});
    newMessage.save().then((newMessage)=>chat.updateOne({members:{$all:[recieverId,senderId]}},{$set:{messages:newMessage._id}},function(err,raw){
        if(err) throw err;
        console.log(raw)
        cb(null)
    }))
}
//required fields message ,chatId,sender,reciever
helphers.createChat= function(senderId,recieverId){
    
    
}
/* 
helphers.chat=function(senderId,recieverId,messageId){
    chat.find({members:{$all:[senderId,recieverId]}})
    .then((chatList)=>{
        if(chatList.length===1){
            console.log(chatList,'chatList')
            chat.updateOne({_id:chatList[0]._id},{$addToSet:{messages:messageId}}).then(res=>console.log(res))
            .catch(err=>console.log(err))
        }else{
                console.log(senderId,recieverId,messageId)
               let newChat = new chat();
                    newChat.members.push(senderId,recieverId)
                    newChat.messages.push(messageId)
                    newChat.save()
                    .then((recieveddata)=>{ console.log('recieved data',recieveddata)})
                    .catch((err)=>console.log(err))
        }
    })
}

    helphers.newChat = function(senderId,recieverId,cb){
        chat.findOne({members:{$all:[senderId,recieverId]}}).populate({path:'messages',select:{"time":1,sender:1,message:1},populate:{path:'sender', select:{"name":1}}})
        .then((result)=>{
            console.log(result,'check1')
            if(result){ 
                console.log(result,'reeesult')
                if(result.messages.length>0){
                    cb(result)
                }
               
            }else{
                let newChat = new chat();
                newChat.members.push(senderId,recieverId)
                newChat.save()
                .then((recieveddata)=>{console.log('recieved data',recieveddata)})
                .catch((err)=>console.log(err))
            }
                })
        .catch((err)=>console.log(err))

} */
helphers.chatId = function(senderId,recieverId,cb){
    chat.findOne({members:{$all:[senderId,recieverId]}},function(err,userChat){
        
        if(err) throw err;
        console.log(userChat,'chartt')
    if(userChat){
        cb(userChat._id)
    }else{
    const newChat = new chat();
    newChat.members.push(senderId,recieverId);
    newChat.save().then(res=>{console.log(res)
    
    cb(res._id)});
    }
    
    })
}
helphers.getInitialChat = function(chatId,cb){
    console.log(chatId,'chattid')
    chat.findById(chatId,{messages:1}).populate('messages','sender message').then((res)=>{
         const {length}=res.messages.length;
         console.log(length,'length')
         cb(res.messages[length-1])
        console.log(res,'ress')})
}

module.exports = helphers;