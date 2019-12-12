const username = prompt("What is your username?");

// const socket = io('http://localhost:9000');
const socket = io('http://localhost:9000',{
    query: {
        username
    }
});

let nsSocket = "";

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
      joinNs(nsEndpoint);
    });
  });

  joinNs(nsData[0].endpoint);
});

// socket.on('ping', () => {
//     console.log('Ping was recieved from the server.');
//     console.log(io.protocol)
// })
// socket.on('pong', latency => {
//     console.log(latency);
//     console.log("Pong was sent to the server.")
// })