//NMSU CS382 Distributed Multiplayer Game Project Mancala
//David Kuntz

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//serve public directory
app.use(express.static("public"));

io.on('connection', function(socket){
  console.log('a user connected');
});

server.listen(3000, function(){
  console.log('listening on localhost:3000');
});