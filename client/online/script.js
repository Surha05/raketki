let log = console.log;

const list = document.querySelector('.list__ul');
const modal = document.querySelector('.modal');
const modalInp = modal.querySelector('.modal__input');
const modalBtn = modal.querySelector('.modal__btn');

let ws = new WebSocket("ws://192.168.0.103:8083");
// let ws = new WebSocket("ws://localhost:8083");
let names = [];
let selfId;
let selfName;

modalBtn.addEventListener('click', () => {
  sendName();
  openList();
});
list.addEventListener('click', playerСhoice)

ws.onmessage = res => {
  const data = JSON.parse(res.data);
  if(data.type == 'send names') {
    names = data.names;
    selfId = data.selfId;
    renderPlayerNames();
    return;
  }
  if(data.type == 'invitation') {
    let fromName = data.fromName;
    let fromId = data.fromId;
    let bool = confirm(`Вас приглашает игрок ${fromName}. Принять?`);
    if(bool) {
      accepting(selfId, fromId);
    } else {
      refusing(fromId);
    }
  }
  if(data.type == 'refusing') {
    alert('Игрок отказался играть');
    return;
  }
  if(data.type == 'accepting') {
    let room = data.room;
    window.location.href = '/online/room?id=' + room;
  }
}
function accepting(selfId, toId) {
  ws.send(JSON.stringify({
    'type': 'accepting',
    'selfId': selfId,
    'toId': toId,
  }));
}
function refusing(id) {
  ws.send(JSON.stringify({
    'type': 'refusing',
    'id': id,
  }));
}
function playerСhoice(e) {
  if(!e.target.closest('.li')) return;
  let el = e.target.closest('.li');
  let id = el.id;
  let name = el.textContent;
  let bool = confirm(`Предложить сыграть игроку ${name}`);
  if(bool) {
    ws.send(JSON.stringify({
      'type': 'playerСhoice',
      'id': id,
    }));
  };
}

function sendName() {
  ws.send(JSON.stringify({
    'type': 'sendName',
    'name': modalInp.value,
  }));
}
function renderPlayerNames() {
  list.innerHTML = '';
  for(let el of names) {
    if(el.id == selfId) continue;
    list.innerHTML += `<li class="li" id="${el.id}">${el.name}</li>`;
  }
}


function openList(){
  list.classList.add('active');
}