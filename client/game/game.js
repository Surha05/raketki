const log = console.log;

const canvas = document.querySelector('#canvas');
const modal = document.querySelector('.modal__wrapper');
const ctx = canvas.getContext('2d');
const body = document.body;
let width = getComputedStyle(canvas).width;
let height = getComputedStyle(canvas).height;
width = parseInt(width);
height = parseInt(height);

canvas.width = width;
canvas.height = height;

// OBJECTs
let player1 = {
  w: 200,
  h: 40,
  x: canvas.width/2 - 100,
  y: canvas.height - 100,
  asseleration: 0.6,
  xSpeed: 0,
  ySpeed: 0,
  maxSpeed: 6,
  score: 0,
  draw() {
    this.move();
    this.setCoordinates();
    ctx.save();
    ctx.fillStyle = '#999';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  },
  move() {
    if(keyPressed.has('ArrowUp')) this.moveUp();
    if(keyPressed.has('ArrowDown')) this.moveDown();
    if(keyPressed.has('ArrowLeft')) this.moveLeft();
    if(keyPressed.has('ArrowRight')) this.moveRight();
  },
  moveUp() {
    if(this.ySpeed < -this.maxSpeed) {
      this.ySpeed = -this.maxSpeed;
      return;
    } else {
      this.ySpeed -= this.asseleration;
    }
  },
  moveDown() {
    if(this.ySpeed > this.maxSpeed) {
      this.ySpeed = this.maxSpeed;
      return;
    } else {
      this.ySpeed += this.asseleration;
    }
  },
  moveLeft() {
    if(this.xSpeed < -this.maxSpeed) {
      this.xSpeed = -this.maxSpeed;
    } else {
      this.xSpeed -= this.asseleration;
    }
  },
  moveRight() {
    if(this.xSpeed > this.maxSpeed) {
      this.xSpeed = this.maxSpeed;
      return;
    } else {
      this.xSpeed += this.asseleration;
    }
  },
  setCoordinates() {
    if(this.x < 0) this.xSpeed = 0.5*Math.abs(this.xSpeed);
    if(this.x > (canvas.width - this.w)) this.xSpeed = -0.5*Math.abs(this.xSpeed);
    if(this.y < (canvas.height/2)) this.ySpeed = 0.5*Math.abs(this.ySpeed);
    if(this.y > (canvas.height - this.h)) this.ySpeed = -0.5*Math.abs(this.ySpeed);
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
};
let player2 = {
  w: 200,
  h: 40,
  x: canvas.width/2 - 100,
  y: 60,
  asseleration: 0.6,
  xSpeed: 0,
  ySpeed: 0,
  maxSpeed: 6,
  score: 0,
  draw() {
    this.move();
    this.setCoordinates();
    ctx.save();
    ctx.fillStyle = '#999';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  },
  move() {
    if(keyPressed.has('KeyW')) this.moveUp();
    if(keyPressed.has('KeyS')) this.moveDown();
    if(keyPressed.has('KeyA')) this.moveLeft();
    if(keyPressed.has('KeyD')) this.moveRight();
  },
  moveUp() {
    if(this.ySpeed < -this.maxSpeed) {
      this.ySpeed = -this.maxSpeed;
      return;
    } else {
      this.ySpeed -= this.asseleration;
    }
  },
  moveDown() {
    if(this.ySpeed > this.maxSpeed) {
      this.ySpeed = this.maxSpeed;
      return;
    } else {
      this.ySpeed += this.asseleration;
    }
  },
  moveLeft() {
    if(this.xSpeed < -this.maxSpeed) {
      this.xSpeed = -this.maxSpeed;
    } else {
      this.xSpeed -= this.asseleration;
    }
  },
  moveRight() {
    if(this.xSpeed > this.maxSpeed) {
      this.xSpeed = this.maxSpeed;
      return;
    } else {
      this.xSpeed += this.asseleration;
    }
  },
  setCoordinates() {
    if(this.x < 0) this.xSpeed = 0.5*Math.abs(this.xSpeed);
    if(this.x > (canvas.width - this.w)) this.xSpeed = -0.5*Math.abs(this.xSpeed);
    if(this.y > (canvas.height/2 - this.h)) this.ySpeed = -0.5*Math.abs(this.ySpeed);
    if(this.y < 0) this.ySpeed = 0.5*Math.abs(this.ySpeed);
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  },
  
};
let ball = {
  r: 20,
  x: canvas.width/2,
  y: canvas.height/2,
  xSpeed: 0,
  ySpeed: 0,
  maxSpeed: 6,

  draw() {
    this.collisionPlayer(player1);
    this.collisionPlayer(player2);
    this.move();
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = '#999';
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI); 
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  },
  move() {
    if(this.xSpeed > this.maxSpeed) this.xSpeed = this.maxSpeed;
    if(this.xSpeed < -this.maxSpeed) this.xSpeed = -this.maxSpeed;
    if(this.ySpeed > this.maxSpeed) this.ySpeed = this.maxSpeed;
    if(this.ySpeed < -this.maxSpeed) this.ySpeed = -this.maxSpeed;
    if(this.x - this.r < 0 ) this.xSpeed = Math.abs(this.xSpeed);
    if(this.x + this.r > canvas.width ) this.xSpeed = -Math.abs(this.xSpeed);
    if(this.y + this.r < 0 ) {
      this.toStartPosition();
      score.player1++;
      this.y = canvas.height/2;
      this.ySpeed = Math.abs(this.ySpeed);
    }
    if(this.y - this.r > canvas.height ) {
      this.toStartPosition();
      score.player2++;
      this.y = canvas.height/2;
      this.ySpeed = -Math.abs(this.ySpeed);
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;
  },
  collisionPlayer(player) {
    if(this.y+this.r < player.y) return;
    if(this.y-this.r > player.y+player.h) return;
    if(this.x+this.r < player.x) return;
    if(this.x-this.r > player.x+player.w) return;
    // столкновение низа мяча и верха player2
    if(this.y < player.y && this.x > player.x && this.x < player.x + player.w ) {
      this.ySpeed = -Math.abs(this.ySpeed) + player.ySpeed/3;
      this.xSpeed += player.xSpeed/3;
      player.ySpeed = Math.abs(player.ySpeed);
    }
    // столкновение верха мяча и низа player2
    if(this.y > player.y+player.h && this.x > player.x && this.x < player.x + player.w ) {
      this.ySpeed = Math.abs(this.ySpeed) + player.ySpeed/3;
      this.xSpeed += player.xSpeed/3;
      player.ySpeed = -Math.abs(player.ySpeed);
    }
    // столкновение левой стороны мяча и правой стороны player2
    if(this.x > player.x+player.w && this.y > player.y && this.y < player.y + player.h ) {
      this.xSpeed = Math.abs(this.xSpeed) + player.xSpeed/3;
      player.xSpeed = -Math.abs(player.xSpeed);
    }
    // столкновение правой стороны мяча и левой стороны player2
    if(this.x < player.x && this.y > player.y && this.y < player.y + player.h ) {
      this.xSpeed = -Math.abs(this.xSpeed) + player.xSpeed/3;
      player.xSpeed = Math.abs(player.xSpeed);
    }
  },
  collisionPlayer1() {
    if(this.y+this.r < player1.y) return;
    if(this.y-this.r > player1.y+player1.h) return;
    if(this.x+this.r < player1.x) return;
    if(this.x-this.r > player1.x+player1.w) return;
    // столкновение низа мяча и верха player 1
    if(this.y < player1.y && this.x > player1.x && this.x < player1.x + player1.w ) {
      this.ySpeed = -Math.abs(this.ySpeed) + player1.ySpeed/3;
      this.xSpeed += player1.xSpeed/3;
      player1.ySpeed = Math.abs(player1.ySpeed);
    }
    // столкновение верха мяча и низа player 1
    if(this.y > player1.y+player1.h && this.x > player1.x && this.x < player1.x + player1.w ) {
      this.ySpeed = Math.abs(this.ySpeed) + player1.ySpeed/3;
      this.xSpeed += player1.xSpeed/3;
      player1.ySpeed = -Math.abs(player1.ySpeed);
    }
    // столкновение левой стороны мяча и правой стороны player1
    if(this.x > player1.x+player1.w && this.y > player1.y && this.y < player1.y + player1.h ) {
      this.xSpeed = Math.abs(this.xSpeed) + player1.xSpeed/3;
      player1.xSpeed = -Math.abs(player1.xSpeed);
    }
    // столкновение правой стороны мяча и левой стороны player1
    if(this.x < player1.x && this.y > player1.y && this.y < player1.y + player1.h ) {
      this.xSpeed = -Math.abs(this.xSpeed) + player1.xSpeed/3;
      player1.xSpeed = Math.abs(player1.xSpeed);
    }
  },
  collisionPlayer2() {
    if(this.y+this.r < player2.y) return;
    if(this.y-this.r > player2.y+player2.h) return;
    if(this.x+this.r < player2.x) return;
    if(this.x-this.r > player2.x+player2.w) return;
    // столкновение низа мяча и верха player2
    if(this.y < player2.y && this.x > player2.x && this.x < player2.x + player2.w ) {
      this.ySpeed = -Math.abs(this.ySpeed) + player2.ySpeed/3;
      this.xSpeed += player2.xSpeed/3;
      player2.ySpeed = Math.abs(player2.ySpeed);
    }
    // столкновение верха мяча и низа player2
    if(this.y > player2.y+player2.h && this.x > player2.x && this.x < player2.x + player2.w ) {
      this.ySpeed = Math.abs(this.ySpeed) + player2.ySpeed/3;
      this.xSpeed += player2.xSpeed/3;
      player2.ySpeed = -Math.abs(player2.ySpeed);
    }
    // столкновение левой стороны мяча и правой стороны player2
    if(this.x > player2.x+player2.w && this.y > player2.y && this.y < player2.y + player2.h ) {
      this.xSpeed = Math.abs(this.xSpeed) + player2.xSpeed/3;
      player2.xSpeed = -Math.abs(player2.xSpeed);
    }
    // столкновение правой стороны мяча и левой стороны player2
    if(this.x < player2.x && this.y > player2.y && this.y < player2.y + player2.h ) {
      this.xSpeed = -Math.abs(this.xSpeed) + player2.xSpeed/3;
      player2.xSpeed = Math.abs(player2.xSpeed);
    }
  },
  toStartPosition() {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.xSpeed = 0;
    this.ySpeed = 0;
  },
};
let score = {
  player1: 0,
  player2: 0,
  draw() {
    let fontSize = 260;
    if(this.player1 >= 10) {
      this.player1 = 'Победа';
      this.player2 = 'Позор';
      pause = true;
      fontSize = 150;
      modal.style.display = 'flex';
    }
    if(this.player2 >= 10) {
      this.player2 = 'Победа';
      this.player1 = 'Позор';
      pause = true;
      fontSize = 150;
      modal.style.display = 'flex';
    }
    ctx.save();
    ctx.fillStyle = '#20dda1';
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(this.player2, canvas.width/2, 80);
    ctx.textBaseline = 'bottom';
    ctx.fillText(this.player1, canvas.width/2, canvas.height - 70);
    ctx.restore();
  },
}

// VARIABLEs
let frame = 0;
let keyPressed = new Set();
let pause = false;

// EVENTs
document.addEventListener('keydown', (e) => {
  keyPressed.add(e.code);
});
document.addEventListener('keyup', e => {
  keyPressed.delete(e.code);
});
modal.addEventListener('click', clickModal);

game();

// FUNCTIONs
function game() {
  if(pause) return;
  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score.draw();
  drawLine();
  player1.draw();
  player2.draw();
  ball.draw();
  requestAnimationFrame(game);
}
function drawLine() {
  ctx.save();
  ctx.fillStyle = '#333';
  ctx.fillRect(0, canvas.height/2 - 3, canvas.width, 6);
  ctx.restore();
}
function clickModal(e) {
  if(e.target.closest('[data-target="replay"]')) location.reload();
  // if(e.target.closest('[data-target="menu"]')) window.location.href = 'URL2';
  
}