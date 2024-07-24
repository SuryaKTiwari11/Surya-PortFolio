let canvas; //what we will be drawing on
let ctx; //providing all the func that we will using in the game
let gBArrayHeight = 20;
let gBArrayWidth = 12;

let startX = 4;
let startY = 0;

let tertisLogo;
//when we start the game the initial pos
//of the object will be {x:4,y:0}
let score = 0;
let level = 1;
let winOrLose = "Playing";
let coordinateArray = [...Array(gBArrayHeight)].map((e) =>
  Array(gBArrayWidth).fill(0)
);
/*Creates an array of length gBArrayHeight,
 where each element is an array of length gBArrayWidth filled with 0s. */
let currentTetromino = [
  [1, 0],
  [0, 1],
  [1, 1],
  [2, 1],
];
let tetromino = [];
let tetrominoColor = [
  "purple",
  "cyan",
  "blue",
  "yellow",
  "green",
  "red",
  "orange",
];
let gameboardArray = [...Array(gBArrayHeight)].map((e) =>
  Array(gBArrayWidth).fill(0)
);

let stoppedShapeArray = [...Array(gBArrayHeight)].map((e) =>
  Array(gBArrayWidth).fill(0)
);

let DIRECTION = {
  IDLE: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
};
// we shall be storing all the shapes in an array
class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
/*The Coordinates class is a blueprint for creating objects that represent coordinates with x and y properties.
The constructor initializes these properties when a new instance is created.
You can create new instances of the Coordinates class by using the new keyword and passing values for x and y. */

document.addEventListener("DOMContentLoaded", SetupCanvas);
//when ever the whole html is fully loaded this function will be executed

//we will write a function to create the array which will help us play the game
// Creates the array with square coordinates [Lookup Table]
// [0,0] Pixels X: 11 Y: 9, [1,0] Pixels X: 34 Y: 9, ...
function CreateCoordArray() {
  let i = 0;
  let j = 0;
  for (let y = 9; y <= 446; y += 23) {
    for (let x = 11; x <= 264; x += 23) {
      coordinateArray[i][j] = new Coordinates(x, y);
      i++;
    }
    j++;
    i = 0;
  }
}
function DrawTetrisLogo() {
  ctx.drawImage(tertisLogo, 300, 8, 161, 54);
}
function SetupCanvas() {
  canvas = document.getElementById("my-canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 936;
  canvas.height = 956;

  // Double the size of elements to fit the screen
  ctx.scale(2, 2);

  // Draw Canvas background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw gameboard rectangle
  ctx.strokeStyle = "black";
  ctx.strokeRect(8, 8, 280, 462);

  tetrisLogo = new Image(161, 54);
  tetrisLogo.onload = DrawTetrisLogo;
  tetrisLogo.src = "tetrislogo.png";

  // Set font for score label text and draw
  ctx.fillStyle = "black";
  ctx.font = "21px Arial";
  ctx.fillText("SCORE", 300, 98);

  // Draw score rectangle
  ctx.strokeRect(300, 107, 161, 24);

  // Draw score
  ctx.fillText(score.toString(), 310, 127);

  // Draw level label text
  ctx.fillText("LEVEL", 300, 157);

  // Draw level rectangle
  ctx.strokeRect(300, 171, 161, 24);

  // Draw level
  ctx.fillText(level.toString(), 310, 190);

  // Draw next label text
  ctx.fillText("WIN / LOSE", 300, 221);

  // Draw playing condition
  ctx.fillText(winOrLose, 310, 261);

  // Draw playing condition rectangle
  ctx.strokeRect(300, 232, 161, 95);

  // Draw controls label text
  ctx.fillText("CONTROLS", 300, 354);

  // Draw controls rectangle
  ctx.strokeRect(300, 366, 161, 104);

  // Draw controls text
  ctx.font = "19px Arial";
  ctx.fillText("A : Move Left", 310, 388);
  ctx.fillText("D : Move Right", 310, 413);
  ctx.fillText("S : Move Down", 310, 438);
  ctx.fillText("E : Rotate Right", 310, 463);

  // 2. Handle keyboard presses
  document.addEventListener("keydown", HandleKeyPress);

  // 3. Create the array of Tetromino arrays
  CreateTetrominos();
  // 3. Generate random Tetromino
  CreateTetromino();

  // Create the rectangle lookup table
  CreateCoordArray();

  DrawTetromino();
}
function DrawTetromino() {
  //cycles through the x and y array for the tetromino
  //looking for the all the places where a sq would be drawn

  // This loop goes through each part of the Tetromino shape. Imagine the Tetromino is made of 4 little squares, and this loop checks each one.
  for (let i = 0; i < currentTetromino.length; i++) {
    let x = currentTetromino[i][0] + startX;
    // These lines find the exact spot on the game board where each little square of the Tetromino should go.
    let y = currentTetromino[i][1] + startY;

    gameboardArray[x][y] = 1; //this marks the spot where the the tetromino block is gonna be placed

    let coorX = coordinateArray[x][y].x;
    let coorY = coordinateArray[x][y].y;
    //These lines get the exact coordinates on the canvas where each little square should be drawn
    ctx.fillStyle = currentTetrominoColor; //*
    ctx.fillRect(coorX, coorY, 21, 21);
  }
}

function HandleKeyPress(key) {
  if (key.keyCode === 65) {
    direction = DIRECTION.LEFT;
    if (!HittingTheWall()) {
      DeleteTetromino();
      startX--;
      DrawTetromino();
    }
  } else if (key.keyCode === 68) {
    direction = DIRECTION.RIGHT;
    if (!HittingTheWall()) {
      DeleteTetromino();
      startX++;
      DrawTetromino();
    }
  } else if (key.keyCode === 83) {
    MoveTetrominoDown();
  }
}
function MoveTetrominoDown() {
  direction = DIRECTION.DOWN;
  if (!checkForVerticalCollision()) {
    DeleteTetromino();
    startY--;
    DrawTetromino();
  }

}
function DeleteTetromino() {
  for (let i = 0; i < currentTetromino.length; i++) {
    let x = currentTetromino[i][0] + startX;
    let y = currentTetromino[i][1] + startY;
    gameboardArray[x][y] = 0; // to tell nothing exist there
    let coorX = coordinateArray[x][y].x;
    let coorY = coordinateArray[x][y].y;
    ctx.fillStyle = "white";
    ctx.fillRect(coorX, coorY);
    ctx.fillReact(coorX, CoorY, 21, 21);
  }
}
function CreateTetrominos() {
  // Push T
  tetrominos.push([
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ]);
  // Push I
  tetrominos.push([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ]);
  // Push J
  tetrominos.push([
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ]);
  // Push Square
  tetrominos.push([
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ]);
  // Push L
  tetrominos.push([
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ]);
  // Push S
  tetrominos.push([
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ]);
  // Push Z
  tetrominos.push([
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ]);
}
function CreateTetromino() {
  let randomTertromino = Math.floor(Math.random() * tetrominos.length);
  //set the current picked
  currentTetromino = tetrominos[randomTertromino];
  currentTetrominoColor = tetrominoColor[randomTertromino];
}

//check for the hits
function HittingTheWall() {
  for (let i = 0; i < currentTetromino.length; i++) {
    let newX = currentTetromino[i][0] + startX;
    if (newX <= 0 && direction === DIRECTION.LEFT) {
      return true;
    } else if (newX >= 11 && direction === DIRECTION.RIGHT) {
      return true;
    }
  }
  return false;
}
//now we need add check while pressing key
// that if this happens but dont go inside the wall
