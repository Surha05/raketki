let log = console.log;

const list = document.querySelector('.list__ul');
const modal = document.querySelector('.modal');
const modalInp = modal.querySelector('.modal__input');
const modalBtn = modal.querySelector('.modal__btn');

// let ws = new WebSocket("ws://192.168.0.104:8083");
let ws = new WebSocket("ws://localhost:8083");
let names = [];
let selfId;
let selfName;

modalBtn.addEventListener('click', () => {
  sendName();
  openList();
});
// list.addEventListener('click', playerСhoice)

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