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

    const username = socket.handshake.query.username;

    socket.emit('nsRoomsLoad', namespace.rooms);

    socket.on('joinRoom', (roomToJoin, numberOfUsersCallback) => {
      const roomToLeave = Object.keys(socket.rooms)[1];
      socket.leave(roomToLeave);
      updateUsersInRoom(namespace, roomToLeave);

      socket.join(roomToJoin);
      // io.of(namespace.endpoint).in(roomToJoin).clients((error, clients) => {
      //   numberOfUsersCallback(clients.length);   
      // });
      const nsRoom = namespace.rooms.find(room => {
        return room.title === roomToJoin;
      });
      socket.emit('historyCatchUp', nsRoom.history);
      updateUsersInRoom(namespace, roomToJoin);
    });

    socket.on('newMessageToServer', msg => {
      const fullMsg = {
          text: msg.text,
          time: Date.now(),
          username: username,
          avatar: 'https://via.placeholder.com/30'
      };

      const roomTitle = Object.keys(socket.rooms)[1];

      const nsRoom = namespace.rooms.find(room => {
          return room.title === roomTitle;
      });

      nsRoom.addMessage(fullMsg);

      io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg);
    });
  });
});

function updateUsersInRoom(namespace, roomToJoin){
  io.of(namespace.endpoint).in(roomToJoin).clients((error,clients) => {
      io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers', clients.length);
  })
}