const express = require('express');
const fs = require('fs');
const path = require('path');

const log = console.log;

const server = express();
server.listen(3000,listen)

const html = fs.readFileSync('../client/index.html','UTF-8');
let staticPath = path.join(__dirname, '..', 'client');
server.use(express.static(staticPath));

function listen()  {
  log('сервак слушает...')
}
