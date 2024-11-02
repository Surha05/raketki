let ws = new WebSocket("ws://localhost:8084");

ws.onopen = () => {
  sendData();
}

function sendData() {
  let name = prompt('Имя');
  ws.send(JSON.stringify({
    'type': 'game',
    'name': name,
  }));
}