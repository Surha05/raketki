const express = require('express');
const server = express();
server.listen(3000,listen)
const fs = require('fs');
const html = fs.readFileSync('../client/index.html','UTF-8');
console.log(__dirname+'../client/css')
server.use(express.static(__dirname+'../client/css'));
server.get('/',start);

<<<<<<< HEAD
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
=======
function listen(){
    console.log('hi')
}

function start(req,res){
res.send(html)
>>>>>>> beslan
}