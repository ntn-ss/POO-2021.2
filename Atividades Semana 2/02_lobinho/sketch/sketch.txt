const NL = 15
const NC = 15
const LADO = 20;

class Cell {
  x: number;
  y: number;
  color: p5.Color;
  constructor(x: number, y: number, color: p5.Color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

class Snake {
  body: Cell;
  vx: number;
  vy: number;
  constructor() {
    this.body = new Cell(0, 0, color("red"));
    this.vx = 1;
    this.vy = 0;
  }
}

let snake: Snake;
let cell_color: p5.Color;
let timer = 0;

function setup() {
  createCanvas(NC*LADO, NL*LADO);
  frameRate(30);
  cell_color = color(20);
  snake = new Snake();
}

function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    snake.vx = -1;
    snake.vy = 0;
  } else if (keyCode === RIGHT_ARROW) {
    snake.vx = 1;
    snake.vy = 0;
  } else if (keyCode === UP_ARROW) {
    snake.vx = 0;
    snake.vy = -1;
  } else if (keyCode === DOWN_ARROW) {
    snake.vx = 0;
    snake.vy = 1;
  }
}

function draw_cell(cell: Cell){
  noStroke();
  fill(cell.color)
  square(cell.x * LADO + 0.3, cell.y * LADO + 0.3, LADO - 0.3);
}

function draw_mat(){
  for(let c=0; c<NC; c++)
    for(let l=0;l<NL;l++)
      draw_cell(new Cell(c,l,cell_color));
}

function snake_loop() {
  if(snake.body.x==NC)
    snake.body.x=0;
  if (snake.body.y==NL)
    snake.body.y=0
  if (snake.body.x==-1)
    snake.body.x=NC-1;
  if (snake.body.y==-1)
    snake.body.y=NL-1;
}

function snake_walk(){
  if (frameCount - timer > 5) {
    timer = frameCount; 
    snake.body.x += snake.vx; 
    snake.body.y += snake.vy;
  }
}

function draw(){
  snake_walk();
  snake_loop();
  background(220);
  draw_mat();
  draw_cell(snake.body);
}