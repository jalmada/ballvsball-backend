var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors');

app.use(express.static('public'));

var allowedOrigins = ["http://localhost:9000", "http://localhost:3001", "http://localhost:3000"];
app.use(cors({
  origin: function(origin, callback){

    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
      io.emit('chat message', msg);
  });

  socket.on('mousemove', function(msg){
    socket.broadcast.emit('mousemove', msg);
  });

  socket.on('paintcircle', function(msg){
    socket.broadcast.emit('paintcircle', msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});