const express = require('express');
const app = express();
const io = require('socket.io')(app);

app.get('/', function(req, res){
  
    res.render(__dirname + '/index.html');

  });



io.on('connection', function(socket){
    ++counter;
  console.log('a user connected',counter);
  
  socket.on('message',function(msg){
    io.emit('message',msg)
  })
  socket.on('userList',function(list){
    io.emit('users',)
  })
  socket.on('disconnect',function(){
      --counter;
      console.log('user disconnected' ,counter)
  })
});

module.exports = app