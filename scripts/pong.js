var canvas = document.createElement('canvas');
var width = 500;
var height = 500;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function(){
    document.body.appendChild(canvas);
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(250,250);

var render = function (){
  context.fillStyle = "#FF2D2D";
  context.fillRect(0,0,width,height);
  player.render();
  computer.render();
  ball.render();
};

function Ball(x,y){
    this.x = x;
    this.y = y;
    this.radius = 5;
}

Ball.prototype.render = function(){
    context.arc(this.x,this.y,this.radius,2*Math.PI,false);
    context.fillstyle = "#3B2DFF";
    context.fill();
};

function Paddle(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Paddle.prototype.render = function(){
    context.fillrect(this.x,this.y,this.width,this.height);
};

function Player(){
    this.paddle = new Paddle (100,10,50,10);
}
function Computer(){
    this.paddle = new Paddle (100,490,50,10);
}

Player.prototype.render = function(){
    context.fillstyle = "#EEEEEE";
    this.paddle.render();
};

Computer.prototype.render = function(){
    context.fillstyle = "#BBBBBB";
    this.paddle.render();
};
