var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const cors = require('cors')
const {mongoose} = require('./db/db');
const {user} = require('./models/user');
const {message} = require('./models/message');
const helpher = require('./helpher')
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
          helpher.chat(data,function(senderId,recieverId){
           let newMessage = new message({sender:senderId,reciever:recieverId,message:data.message})
            newMessage.save().then((messageId)=>{
              message.findById(messageId._id).populate('sender reciever').then((result)=>{ socket.emit('chatt',data) ;console.log(result,'ree')})
            })
           
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
          sender.save().then(result=>console.log(result,'opop'))
      }
    })
    .catch((err)=>console.log(err))
    
    
    console.log('p')
})
  socket.on('askName',function(msg){
    console.log(obj)
      socket.emit('send',obj.sender)
  })
  
  
 
  socket.on('userList',function(name){
    user.find({name:{$ne:obj.sender}},'name',function(err,list){
      io.emit('users',list)
    })  
  })
  
  socket.on('newUser',function(data){
    helpher.newUser(data,function(result){
      console.log(result)
    })
  })
  socket.on('disconnect',function(){
      --counter;
      console.log('user disconnected' ,counter)
  })
});

http.listen(4001, function(){
  console.log('listening on *:3001');
});