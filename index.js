const COLOURS = {
  board_border: "black",
  board_background: "white",
  snake_colour: "lightblue",
  snake_border: "darkblue",
};

let dx = 10;
let dy = 0;

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

const getRandomNumber = () => Math.floor(Math.random() * 500);

const snakeBoard = document.getElementById("snake-canvas");
const snakeBoard_ctx = snakeBoard.getContext("2d");

// draw a border around the canvas
const clearCanvas = () => {
  //  Select the colour to fill the drawing
  snakeBoard_ctx.fillStyle = COLOURS.board_background;
  //  Select the colour for the border of the canvas
  snakeBoard_ctx.strokestyle = COLOURS.board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeBoard_ctx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
  // Draw a "border" around the entire canvas
  snakeBoard_ctx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
};

const drawFruit = () => {
  snakeBoard_ctx.fillStyle = "black";
  const xAxis = getRandomNumber();
  const yAxis = getRandomNumber();
  snakeBoard_ctx.beginPath();
  snakeBoard_ctx.arc(xAxis, yAxis, 4, 0, 2 * Math.PI);
  snakeBoard_ctx.fill();
};

const drawSnakePart = (snakePart) => {
  // Set the colour of the snake part
  snakeBoard_ctx.fillStyle = COLOURS.snake_colour;
  // Set the border colour of the snake part
  snakeBoard_ctx.strokestyle = COLOURS.snake_border;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  snakeBoard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  // Draw a border around the snake part
  snakeBoard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
};

const drawSnake = () => {
  snake.forEach(drawSnakePart);
};

const moveSnake = (direction = "right") => {
  const headOfSnake = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(headOfSnake);
  snake.pop();
};

const changeDirection = (e) => {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = e.keyCode;

  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  // check if goingRight so that it does not reverse the snake if left key is pressed
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
};

const checkGameOver = () => {
  const head = { x: snake[0].x, y: snake[0].y };
  for (let i = 1; i < snake.length; i++) {
    // if the coordinates of the snake head matches any of the coordinates of its body part,
    // it has collided with itself
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  console.log(head.y);
  
  const hitLeftWall = head.x < 0;
  const hitRightWall = head.x > snakeBoard.width - 10;
  const hitTopWall = head.y < 0;
  const hitBottomWall = head.y > snakeBoard.height - 10;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
};

document.addEventListener("keydown", changeDirection);

const main = () => {
  if (!checkGameOver()) {
    setTimeout(() => {
      clearCanvas();
      moveSnake();
      drawSnake();
      main();
    }, 100);
  } else {
    clearCanvas();
  }
};

main();
