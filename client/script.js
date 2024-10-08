let log = console.log;

const list = document.querySelector('.list');
const btn = document.querySelector('.btn');

// let ws = new WebSocket("ws://192.168.0.104:8083");
let ws = new WebSocket("ws://localhost:8083");
let names = [];
let selfId;

btn.addEventListener('click', sendName);
list.addEventListener('click', playerСhoice)

ws.onmessage = res => {
  const data = JSON.parse(res.data);
  if(data.names) {
    names = data.names;
    selfId = data.selfId;
    renderPlayerNames();
    return;
  }
  if(data.type == 'invitation') {
    let fromName = data.fromName;
    alert(`Вас приглашает игрок ${fromName}`);
  }
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
  let name = prompt('Имя');
  ws.send(JSON.stringify({
    'type': 'sendName',
    'name': name,
  }));
}
function renderPlayerNames() {
  list.innerHTML = '';
  for(let el of names) {
    if(el.id == selfId) continue;
    list.innerHTML += `<li class="li" id="${el.id}">${el.name}</li>`;
  }
}



