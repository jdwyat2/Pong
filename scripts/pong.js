var animate = window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function(){
    document.body.appendChild(canvas);
    animate(step);
};

function step () {
    update();
    render();
    animate(step);
}

var update = function(){
    player.update();
    ball.update(player.paddle, computer.paddle);
};

Player.prototype.update = function(){
    for(var key in keysDown){
        var value = Number(key);
        if(value == 37){
            this.paddle.move(-4,0);
        } else if (value == 39) {
            this.paddle.move(4,0);
        } else {
            this.paddle.move(0,0);
        }
    }
};

Computer.prototype.update = function(ball){
    var xCoord = ball.x;
    var diff = ((this.paddle.x + (this.paddle.width /2 )) - xCoord);
    if ( diff < 0 && diff < -4 ) {
        diff = -5;
    } else if(diff > 0 && diff >4){
        diff = 5;
    } 
    this.paddle.move(diff,0);
    if(this.paddle.x < 0) {
        this.paddle.x = 0;
    } else if (this.paddle.x + this.paddle.width > 400){
        this.paddle.x = 400 - this.paddle.width;
    }
};

Paddle.prototype.move = function(x,y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.x <0){
        this.x = 0;
        this.x_speed = 0;
    } else if (this.x + this.width > 400) {
        this.x = 400 - this.width;
        this.x_speed = 0;
    }
};

Ball.prototype.update = function(computerPaddle, playerPaddle){
    this.x += this.x_speed;
    this.y += this.y_speed;
    var topX = this.x -5;
    var topY = this.y-5;
    var bottomX = this.x+5;
    var bottomY = this.y+5;
    
    if(this.x - 5 < 0){
        this.x = 5;
        this.x_speed = this.x_speed * -1;
    } else if (this.x +5 > 400) {
        this.x = 395;
        this.x_speed = this.x_speed * -1;
    }
    
    if (this.y <0 || this.y > 600){
        this.x_speed = 0;
        this.y_speed = 3;
        
        if(this.y < 0){
            playerScore ++;
        }
        
        if(this.y > 600) {
            enemyScore ++;
        }
    }
    
    if(topY > 300){
        if(topY < (computerPaddle.y + computerPaddle.height) && bottomY > computerPaddle.y && topX < (computerPaddle.x + computerPaddle.width) && bottomX > computerPaddle.x){
            this.y_speed = -3;
            this.x_speed += (computerPaddle.x_speed / 2);
            this.y += this.y_speed;
        }
    } else {
        if (topY < (playerPaddle.y + playerPaddle.height) && bottomY > playerPaddle.y && topX < (playerPaddle.x + playerPaddle.width) && bottomX > playerPaddle.x){
            this.y_speed = 3;
            this.x_speed += (playerPaddle.x_speed / 2);
            this.y += this.y_speed;
        }
    }
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(100,100);
var enemyScore = new EnemyScore();
var playerScore = new PlayerScore();

var render = function (){
  context.fillStyle = "#FF2D2D";
  context.fillRect(0,0,width,height);
  player.render();
  computer.render();
  ball.render();
  enemyScore.render();
  playerScore.render();
};

function Ball(x,y){
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.x_speed  = 0;
    this.y_speed = 3;
}

Ball.prototype.render = function(){
    context.beginPath();
    context.arc(this.x,this.y,this.radius,2*Math.PI,false);
    context.fillstyle = "#3B2DFF";
    context.fill();
};

function Paddle(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

Paddle.prototype.render = function(){
    context.fillRect(this.x,this.y,this.width,this.height);
};

function Player(){
    this.paddle = new Paddle (175, 580, 50, 10);
}
function Computer(){
    this.paddle = new Paddle (175, 10, 50, 10);
}

Player.prototype.render = function(){
    context.fillStyle = "#EEEEEE";
    this.paddle.render();
};

Computer.prototype.render = function(){
    context.fillStyle = "#BBBBBB";
    this.paddle.render();
};

function EnemyScore() {
    this.enemyScore = 0;
}

function PlayerScore() {
    this.playerScore = 0;
}

EnemyScore.prototype.update = function () {
    if (this.enemyScore  === 10){
        alert("The enemy has won... All is lost!!");
    }
};

PlayerScore.prototype.update = function() {
    if(this.playerScore === 10){
        alert("You won! Prepare to asert your will over your new dominion!!");
    }
};

var keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyUp", function(event) {
    delete keysDown[event.keyCode];
});







