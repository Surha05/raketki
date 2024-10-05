const express = require('express');
const path = require('path');
const http = require("http");
const WebSocket = require("ws");
const app = express();
app.use(express.static(path.join(__dirname, '..', 'client')));
app.listen(3000);
const httpServer = http.createServer();
const wss = new WebSocket.Server({ server: httpServer });
httpServer.listen(8083);

let players = [];

wss.on("connection", connection => {
  connection.id = addId();
  players.push(connection);
  sendName();
  
  connection.on('message', data => {
    let result = JSON.parse(data);
    if(result.name) {
      connection.playerName = result.name;
      sendName();
    }
  });

  connection.on("close", () => {
    const id = connection.id;
    players = players.filter(el => el.id !== id);
    sendName();
  });
  connection.on("error", () => {
    const id = connection.id;
    players = players.filter(el => el.id !== id);
    sendName();
  });
});

let orderId = 0;
function addId() {
  orderId++;
  return orderId;
}

function sendName() {
  let names = [];
  for(let el of players) {
    names.push(el.playerName || 'не указано');
  }
  for(let el of players) {
    el.send(JSON.stringify({
      names: names,
    }));
  }
}



