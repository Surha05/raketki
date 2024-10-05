const list = document.querySelector('.list');
const btn = document.querySelector('.btn');

let ws = new WebSocket("ws://localhost:8083");
let names = [];

btn.addEventListener('click', sendName);
// let name = prompt('Имя')
// ws.onopen = e => {
//   ws.send(JSON.stringify({
//     name: name,
//   }))
// }
ws.onmessage = res => {
  const data = JSON.parse(res.data);
  if(data.names) {
    names = data.names;
    renderPlayerNames();
    console.log(names);
  }
  // const users = response.users;
  
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
    list.innerHTML += `<li class="li">${el}</li>`;
  }
}



