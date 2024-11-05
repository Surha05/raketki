const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require("http");
const WebSocket = require("ws");

const log = console.log;

const server = express();
server.listen(3000,listen)
const httpServer = http.createServer();
const wss = new WebSocket.Server({ server: httpServer });
httpServer.listen(8083);

let players = [];
let orderId = {
  id: 0,
  add() {
    this.id++;
    return this.id;
  }
}
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
      type: 'send names',
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

let staticPath = path.join(__dirname, '..', 'client');
server.use(express.static(staticPath));
server.use('/online', online);

function online(req, res, next) {
  next();
}

function listen()  {
  log('сервак слушает...')
}
