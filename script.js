const gameBord = document.querySelector("#gameBord");
const ctx = gameBord.getContext("2d")
const scoreText = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBord.width;
const gameHeight = gameBord.height;
const bordBackkgroound = "white";
const snakeColor = "lightgreen";
const foodColor = "red";
const snakeBorder = "black";
const uniteSize = 25;
let running = false;
let xVelocity = uniteSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  {x:uniteSize * 4, y:0},
  {x:uniteSize * 3, y:0},
  {x:uniteSize * 2, y:0},
  {x:uniteSize, y:0},
  {x:0, y:0},
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
  running = true;
  scoreText.textContent = score;
  creatFood();
  drawFood();
  nextTick();
};
function nextTick(){
  if(running){
    setTimeout(() => {
      clearBord();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  }
  else{
    displayGameOver();
  }
};
function clearBord(){
  ctx.fillStyle = bordBackkgroound;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function creatFood(){
  function randomFood(min, max){
    const randomNum = Math.round((Math.random() * (max - min) + min) / uniteSize) * uniteSize;
    return randomNum;
  }
  foodX = randomFood(0, gameWidth - uniteSize);
  foodY = randomFood(0, gameWidth - uniteSize);
};
function drawFood(){
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, uniteSize, uniteSize);
};
function moveSnake(){
  const head = { x: snake[0].x + xVelocity,
                  y: snake[0].y +yVelocity};
        snake.unshift(head);
        //if food eaten
        if(snake[0].x == foodX && snake[0].y == foodY){
          score++;
          scoreText.textContent = score;
          creatFood();
        }
        else{
          snake.pop();
        }
};
function drawSnake(){
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, uniteSize, uniteSize);
    ctx.strokeRect(snakePart.x, snakePart.y, uniteSize, uniteSize);
  })
};
function changeDirection(event){
  const keyPresed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const goingUp = (yVelocity == -uniteSize);
  const goingDown = (yVelocity == uniteSize);
  const goingRight = (xVelocity == uniteSize);
  const goingLeft = (xVelocity == -uniteSize);

  switch(true){
    case(keyPresed == LEFT && !goingRight):
      xVelocity = -uniteSize;
      yVelocity = 0;
      break;
    case(keyPresed == RIGHT && !goingLeft):
      xVelocity = uniteSize;
      yVelocity = 0;
      break;
    case(keyPresed == UP && !goingDown):
      xVelocity = 0;
      yVelocity = -uniteSize;
      break;
    case(keyPresed == DOWN && !goingUp):
      xVelocity = 0;
      yVelocity = uniteSize;
      break;
  }
};
function checkGameOver(){
  switch(true){
    case (snake[0].x < 0):
      running = false;
      break;
    case (snake[0].x >= gameWidth):
      running = false;
      break;
    case (snake[0].y < 0):
      running = false;
      break;
    case (snake[0].y >= gameWidth):
      running = false;
      break;
  }
  for(let i = 1; i < snake.length; i++){
    if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
      running = false;
    }
  }
};
function displayGameOver(){
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "centre";
  ctx.fillText("GAME OVER!", (gameWidth / 5), (gameHeight / 2));
  running = false;
};
function resetGame(){
  score = 0;
  xVelocity = uniteSize;
  yVelocity = 0;
  
  snake = [
  {x:uniteSize * 4, y:0},
  {x:uniteSize * 3, y:0},
  {x:uniteSize * 2, y:0},
  {x:uniteSize, y:0},
  {x:0, y:0},
];
  gameStart();
};
