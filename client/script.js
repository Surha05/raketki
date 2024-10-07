let log = console.log;

const list = document.querySelector('.list');
const btn = document.querySelector('.btn');

let ws = new WebSocket("ws://localhost:8083");
let names = [];

btn.addEventListener('click', sendName);
list.addEventListener('click', playerСhoice)

ws.onmessage = res => {
  const data = JSON.parse(res.data);
  if(data.names) {
    names = data.names;
    renderPlayerNames();
    return;
  }
  if(data.type == 'invitation') {
    alert('Вас приглашают в игру');
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
    'name': name,
  }));
}
function renderPlayerNames() {
  list.innerHTML = '';
  for(let el of names) {
    list.innerHTML += `<li class="li" id="${el.id}">${el.name}</li>`;
  }
}



