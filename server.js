//NMSU CS382 Distributed Multiplayer Game Project Mancala
//David Kuntz

const port = 3000;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var session = require('express-session');
var FileStore = require('session-file-store')(session);

//serve public directory
app.use(express.static("public"));

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'whykeyboardcat',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('update', function(update){
    io.emit(gameState);
  })
});

app.get('/', function(req, res) {
  console.log(req.session.name);
});

app.get("/session", function(req, res){ 
   
}) 

server.listen(port, function(){
  console.log('listening on localhost:'+port);
});