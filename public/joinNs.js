function joinNs(endpoint){
  const nsSocket = io(`http://localhost:9000${endpoint}`);

  nsSocket.on('nsRoomsLoad', nsRooms => {
      let roomList = document.querySelector('.room-list');
      roomList.innerHTML = "";

      nsRooms.forEach(room => {
          let glyph;
          if (room.isPrivate) {
              glyph = 'lock'
          } else {
              glyph = 'globe'
          }
          roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.title}</li>`
      });

      let roomNodes = document.getElementsByClassName('room');
      Array.from(roomNodes).forEach((elem)=>{
          elem.addEventListener('click', e => {

          })
      });
  });
}