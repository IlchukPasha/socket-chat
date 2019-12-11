const socket = io('http://localhost:9000');
const socket1 = io('http://localhost:9000/wiki');
const socket2 = io('http://localhost:9000/mozilla');
const socket3 = io('http://localhost:9000/linux');

// socket.on('connect', () => {
//   console.log('socker id: ', socket.id)
// });

socket.on('nsList', nsData => {
  const namespacesDiv = document.querySelector('.namespaces');
  namespacesDiv.innerHTML = "";
  nsData.forEach(ns => {
    namespacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}" /></div>`;
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(elem => {
    const nsEndpoint = elem.getAttribute('ns');
    elem.addEventListener('click', e => {

    });
  });

  joinNs('/wiki');
});

// socket.on('ping', () => {
//     console.log('Ping was recieved from the server.');
//     console.log(io.protocol)
// })
// socket.on('pong', latency => {
//     console.log(latency);
//     console.log("Pong was sent to the server.")
// })