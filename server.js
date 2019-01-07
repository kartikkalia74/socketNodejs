var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const {mongoose} = require('./db/db');




const helpher = require('./helphers/helpher');
const {user} = require('./models/user');
var counter=0;



app.get('/users',(req,res)=>{
  user.find({})
  .then((result)=>{
    console.log(result)
    let userCount = result.length;
    let outputString =''
    let  output = result.map((member)=>'<li>'+member.name+'</li>')
    output.forEach(function(member){
        outputString+= member
    })
    return res.send(outputString)
  }).catch((err)=>console.log(err))
})
app.get('/', function(req, res){
  console.log(__dirname)
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/newUser',function(req,res){
  res.sendFile(__dirname+'/views/adduser.html')
})

io.on('connection', function(socket){
    ++counter;
  console.log('a user connected',counter);
  socket.on('message',function(msg){
      console.log(msg,'message')
      obj ={msg,
      name:'kar'}
      io.emit('messagechat',obj)
  })
  socket.on('newUser',function(data){
    console.log('p')
    helpher.newUser(data,function(result){
      console.log(result)
    })
    console.log(data)
  })
  socket.on('disconnect',function(){
      --counter;
      console.log('user disconnected' ,counter)
  })
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});