const express = require('express');
const app = express();
const io = require('socket.io')(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');

  });



io.on('connection', function(socket){
    ++counter;
  console.log('a user connected',counter);
  
  socket.on('message',function(msg){
    io.emit('message',msg)
  })
  
  socket.on('disconnect',function(){
      --counter;
      console.log('user disconnected' ,counter)
  })
});

module.exports = app