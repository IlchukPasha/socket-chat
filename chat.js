const express = require('express');
const socketio = require('socket.io');

const namespaces = require('./data/namespaces');

const app = express();

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on('connection', socket => {
  const nsData = namespaces.map(n => ({ img: n.img, endpoint: n.endpoint }));
  socket.emit('nsList', nsData);
});

namespaces.forEach(namespace => {
  io.of(namespace.endpoint).on('connection', socket => {
    console.log(`${socket.id} has joined ${namespace.endpoint}`);
    socket.emit('nsRoomsLoad', []);
  });
});