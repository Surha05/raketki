const log = console.log;

const canvas = document.querySelector('#canvas');
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
  xSpeed: 2,
  ySpeed: 2,
  maxSpeed: 0,

  move() {
    if(this.x - this.r < 0 ) this.xSpeed = Math.abs(this.ySpeed);
    if(this.x + this.r > canvas.width ) this.xSpeed = -Math.abs(this.ySpeed);
    if(this.y - this.r < 0 ) this.ySpeed = Math.abs(this.ySpeed);
    if(this.y + this.r > canvas.height ) this.ySpeed = -Math.abs(this.ySpeed);

    this.x += this.xSpeed;
    this.y += this.ySpeed;
  },
  draw() {
    this.collision();
    this.move();
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = '#999';
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI); 
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  },
  collision() {
    if(this.y + this.r > player1.y
      && this.y - this.r < player1.y + player1.h
      && this.x + this.r > player1.x
      && this.x - this.r < player1.x + player1.w
    ) {
      if(this.y + this.r > player1.y) {
        this.ySpeed = -Math.abs(this.ySpeed);
        player1.ySpeed = Math.abs(player1.ySpeed);
      }
      if(this.y - this.r < player1.y + player1.h) {
        this.ySpeed = Math.abs(this.ySpeed);
        player1.ySpeed = -Math.abs(player1.ySpeed);
      }
    }
  }
};

// VARIABLEs
let frame = 0;
let keyPressed = new Set();

// EVENTs
document.addEventListener('keydown', (e) => {
  keyPressed.add(e.code);
});
document.addEventListener('keyup', e => {
  keyPressed.delete(e.code);
});

game();

// FUNCTIONs
function game() {
  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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