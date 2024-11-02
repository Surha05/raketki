let log = console.log;

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

// const httpServer2 = http.createServer();
// const wss2 = new WebSocket.Server({ server: httpServer2 });
// httpServer2.listen(8084);

let players = [];
let orderId = {
  id: 0,
  add() {
    this.id++;
    return this.id;
  }
}
// wss2.on("connection", connection => {
//   connection.on('message', data => {
//     let result = JSON.parse(data);

//     if(result.type === 'game') {
//       log(result.name)
//       return;
//     }
//   });
// });

wss.on("connection", connection => {
  connection.player = {
    id: orderId.add(),
  }
  players.push(connection);
  sendName();
  
  connection.on('message', data => {
    let result = JSON.parse(data);
    if(result.type === 'sendName') {
      log(result.name)
      connection.player.name = result.name;
      sendName();
      return;
    }
    if(result.type === 'playerСhoice') {
      let id = result.id;
      let from = connection.player;
      sendChoice(from ,id);
      log(result)
      return;
    }
  });

  connection.on("close", () => {
    const id = connection.player.id;
    players = players.filter(el => el.player.id !== id);
    sendName();
  });
  connection.on("error", () => {
    const id = connection.id;
    players = players.filter(el => el.player.id !== id);
    sendName();
  });
});



function sendName() {
  let names = [];
  for(let el of players) {
    if(!el.player.name) continue;
    names.push({
      id: el.player.id,
      name: el.player.name,
    });
  }
  for(let el of players) {
    el.send(JSON.stringify({
      names: names,
      selfId: el.player.id,
    }));
  }
}
function sendChoice(from, toId) {
  let opponent = players.find(el => el.player.id == toId);
  opponent.send(JSON.stringify({
    type: 'invitation',
    fromName: from.name,
  }));
}