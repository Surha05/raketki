const express = require('express');
const server = express();
server.listen(3000,listen)
const fs = require('fs');
const html = fs.readFileSync('../client/index.html','UTF-8');
console.log(__dirname+'../client/css')
server.use(express.static(__dirname+'../client/css'));
server.get('/',start);

function listen(){
    console.log('hi')
}

function start(req,res){
res.send(html)
}