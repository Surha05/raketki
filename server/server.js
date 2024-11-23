const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require("http");
const WebSocket = require("ws");

const server = express();
const httpServer = http.createServer();
const wss = new WebSocket.Server({ server: httpServer });
const log = console.log;
const gameServer = http.createServer();
const gamewss = new WebSocket.Server({ server: gameServer });

gameServer.listen(8084);
server.listen(3000,listen)
httpServer.listen(8083);

let players = [];
let rooms = [];
let orderId = {
  id: 0,
  add() {
    this.id++;
    return this.id;
  }
}
let roomId = {
  id: 0,
  add() {
    this.id++;
    return this.id;
  }
}
let playerRoomId = {
  id: 0,
  add() {
    this.id++;
    return this.id;
  }
}
let roomPlayers = [];
gamewss.on('connection', connection => {
  connection.player = {
    id: playerRoomId.add(),
    room: undefined,
  }
  roomPlayers.push(connection);
  let opponent;
  connection.on('message', data => {
    let result = JSON.parse(data);
    
    if(result.type === 'room') {
      let room = connection.player.room = result.room;
      opponent = roomPlayers.find(el => {
        if(el.player.id == connection.player.id) return;
        if(room == el.player.room) return el;
        log(opponent.player.id);
      });
      return;
    }
    if(result.type === 'playerPosition' && opponent) {
      log('data')
      opponent.send(JSON.stringify(result));
      return;
    }
  })
})
wss.on("connection", connection => {
  
  connection.player = {
    id: orderId.add(),
  }
  
  players.push(connection);
  sendName();
  
  connection.on('message', data => {
    let result = JSON.parse(data);
    if(result.type === 'sendName') {
      connection.player.name = result.name;
      sendName();
      return;
    }
    if(result.type === 'playerСhoice') {
      let id = result.id;
      let from = connection.player;
      sendChoice(from ,id);
      return;
    }
    if(result.type === 'refusing') {
      let id = result.id;
      refusing(id);
      return;
    }
    if(result.type === 'accepting') {
      let selfId = result.selfId;
      let toId = result.toId;
      accepting(selfId, toId);
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
function accepting(selfId, toId) {
  let player1 = players.find(el => el.player.id == selfId);
  let player2 = players.find(el => el.player.id == toId);
  let room = roomId.add();
  player1.send(JSON.stringify({
    type: 'accepting',
    room: room,
  }));
  player2.send(JSON.stringify({
    type: 'accepting',
    room: room,
  }));
}
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
    fromId: from.id,
  }));
}
function refusing(id) {
  let opponent = players.find(el => el.player.id == id);
  opponent.send(JSON.stringify({
    type: 'refusing',
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
