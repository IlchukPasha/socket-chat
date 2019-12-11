const express = require('express');
const socketio = require('socket.io');

const app = express();

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on('connection', socket => {
  console.log('connected');
  // socket.emit('messageFromServer', { data: 'Welcome!' });

  // socket.on('messageToServer', dataFromClient => {
  //   console.log(dataFromClient);
  // });

  // socket.on('newMessageToServer', message => {
  //   io.emit('messageToClients', { text: message.text });
  // });
});