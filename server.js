var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const cors = require('cors')
const {mongoose} = require('./db/db');
const {user} = require('./models/user');
const {message} = require('./models/message');
const {chat} = require('./models/chat');
const helpher = require('./helpher');
var counter=0;
let obj = {}
let messageObj ={};

app.use(cors())

app.get('/users',(req,res)=>{
 res.sendFile(__dirname+'/views/'+'users.html');
})
app.get('/', function(req, res){
 console.log('react project')
});
app.get('/check',(req,res)=>{
user.find({$or:[{name:'rahul'},{name:'kartik'}]}).then(result=>res.send(result))
.catch(err=>console.log(err))
})
app.get('/newUser',function(req,res){
  res.sendFile(__dirname+'/views/adduser.html');
})

io.on('connection', function(socket){
    ++counter;
      console.log('userconnected'+counter)
        socket.on('chat',function(data){
          console.log(data,'dataaa')
          helpher.members(data.sender,data.reciever,function(senderId,recieverId){
           let newMessage = new message({sender:senderId,reciever:recieverId,message:data.message})
            newMessage.save().then((messageId)=>{
              helpher.chat(senderId,recieverId,messageId._id)
              message.findById(messageId._id,'message time').populate('sender reciever','name').then((result)=>{ socket.emit('chat',result) ;console.log(result,'ree')})
            })   
          })
    })
    socket.on(`'111-chat'`,(chatGroup)=>{
      console.log('incomming request',chatGroup)
      chat.findOne({_id:chatGroup.chatId},function(err,memberChat){
        if(err) throw err;
        //is chat before
        console.log(chatGroup)
        console.log(memberChat,'memberchat')
        if(memberChat){

           helpher.saveMessage(obj.senderId,obj.recieverId,chatGroup.message,chatGroup.chatId,function(err,messageId){
            if(!err){
              console.log(messageId,'newMessage')
              message.findById(messageId,{message:1,sender:1,time:1}).populate('sender')
              .then((res)=>{console.log(res,'ressssssssss') ; socket.emit(`'${chatGroup.chatId}-new'`,{res})})
                
              
                
            }
          }) 
          //is send any message
          
        }
        console.log(memberChat,'memberchat')
      })
     
    })
 /*  socket.on('message',function(msg,clientId){
      obj ={msg,name:'kar'}
      socket.emit('messagechat',obj)
  }) */

  socket.on('sender',function(senderName){
    console.log(senderName,'sendernam')
    user.find({name:senderName})
    .then(result=>{
      console.log(result,'result')
      if(result.length){
        console.log('innerLength')
        obj.sender=senderName;

      }else{
          let sender=new user({name:senderName})
          sender.save().then(result=>{
               obj.sender= result.name;
            console.log(obj,'opop')
          })
      }
    })
    .catch((err)=>console.log(err))
    console.log('p')
})
  
  socket.on('initials',function(msg){
    console.log('chatNames')
        helpher.members(obj.sender,obj.reciever,function(senderId,recieverId){
          helpher.chatId(senderId,recieverId,(chatId)=>{
            obj.chatId=chatId;
            helpher.getInitialChat(chatId,(initialChat)=>{
              socket.emit('chatName',{sender:obj.sender,reciever:obj.reciever,chatId,chat:initialChat})
            })
          })
  
       console.log(obj,"ofbj")
      
      })
    })
  socket.on('userList',function(name){
      user.find({name:{$ne:obj.sender}},'name',function(err,list){
        if(err) throw err;
        io.emit('users',list)
    })  
  })
  
  socket.on('sendReciever',function(recieverName){
      obj.reciever= recieverName;
      console.log(obj.sender,recieverName,'reciverName');
      helpher.members(obj.sender,recieverName,function(senderId,recieverId){
        obj.senderId = senderId;
        obj.recieverId= recieverId;
        helpher.createChat
        console.log(senderId,recieverId,'check2')
        
        })
      
  });
  
  socket.on('disconnect',function(){
      --counter;
      console.log('user disconnected' ,counter)
  })
});

http.listen(4001, function(){
  console.log('listening on *:3001');
});