class Entity{
    x: number;  //atributos
    y: number;
    step: number;
    vivo: boolean;
    image: p5.Image;
                //parametros
    constructor(x: number, y:number, step: number, vivo: boolean, image:p5.Image) {
        this.x = x;
        this.y = y;
        this.step = step;
        this.vivo = vivo;
        this.image = image;
    }
    //metodos
    draw(){
        image(this.image, this.x * this.step, this.y * this.step, this.step, this.step);
    }
    passou(){
        if (this.x <= -1){
            this.x = board.nc-1;
        } if (this.x >= board.nc){
            this.x = 0;
        } if (this.y >= board.nl){   
            this.y = 0;
        }if (this.y <= -1){
            this.y = board.nl-1;
        }
    }
    coelhofalece(){
        if(rabbit.x==wolf.x&&rabbit.y==wolf.y){
            rabbit.vivo=false;
        }
    }
}

class Board{
    nl: number;
    nc: number;
    step: number;
    background: p5.Image;

    constructor(nc: number, nl: number, step: number, background: p5.Image){
        this.nc = nc;
        this.nl = nl;
        this.step = step;
        this.background=background;
    }

    draw(): void{
        image(this.background, 0, 0, this.nc * this.step, this.nl * this.step);
        for (let x=0; x < this.nc; x++){
            for (let y = 0; y < this.nl; y++){
                noFill();
                stroke(0);
                strokeWeight(2);
                rect(x * this.step, y * this.step, this.step, this.step);
            }
        }
    }
}

class Hazard{
    x: number;  //atributos
    y: number;
    step: number;
    image: p5.Image;
                //parametros
    constructor(x: number, y:number, step: number, image:p5.Image) {
        this.x = x;
        this.y = y;
        this.step = step;
        this.image = image;
    }
    //metodos
    draw(){
        image(this.image, this.x * this.step, this.y * this.step, this.step, this.step);
    }

    criaturas(){
        if(wolf.x==hole.x&&wolf.y==hole.y){
            wolf.vivo=false;
        }

        if(rabbit.x==hole.x&&rabbit.y==hole.y){
            rabbit.y+=1;
        }
    }
}

let wolf_img: p5.Image;
let wolf_img2: p5.Image;
let rabbit_img: p5.Image;
let board_img: p5.Image;
let hole_img: p5.Image;

let wolf:Entity;
let rabbit:Entity;
let board: Board;
let hole: Hazard;

let hole_x:number;
let hole_y:number;

function loadImg(path: string): p5.Image {
    return loadImage(
        path,
        () => console.log("Loading "+ path + " ok"),
        () => console.log("Loading "+ path + " error")
    );
}

function preload() {
    wolf_img = loadImg('../sketch/lobol.png');
    rabbit_img = loadImg('../sketch/coelho.png');
    board_img = loadImg('../sketch/grama.jpg');
    wolf_img2 = loadImg('../sketch/lobor.png');
    hole_img = loadImg('../sketch/buraco.png');
}

function keyPressed(){
    if (keyCode === LEFT_ARROW&&wolf.vivo==true){
        wolf.x--;
        wolf.image=wolf_img;
    } else if (keyCode === RIGHT_ARROW&&wolf.vivo==true){
        wolf.x++;
        wolf.image=wolf_img2;
    } else if (keyCode === UP_ARROW&&wolf.vivo==true){
        wolf.y--;
    } else if (keyCode === DOWN_ARROW&&wolf.vivo==true){
        wolf.y++;
    }

    if (keyCode === "A".charCodeAt(0)&&rabbit.vivo==true){
        rabbit.x--;
    } else if (keyCode === "D".charCodeAt(0)&&rabbit.vivo==true){
        rabbit.x++;
    } else if (keyCode === "W".charCodeAt(0)&&rabbit.vivo==true){
        rabbit.y--;
    } else if (keyCode === "S".charCodeAt(0)&&rabbit.vivo==true){
        rabbit.y++;
    }
}

function setup(){
    let size = 100;
    board = new Board (6, 4, size, board_img);
    hole_x = round (random(board.nc));
    hole_y = round (random(board.nl));
    wolf = new Entity (2, 2, size, true, wolf_img);
    rabbit = new Entity (1, 1, size, true, rabbit_img);
    hole = new Hazard (hole_x, hole_y, size, hole_img);
    createCanvas(board.nc * size, board.nl * size);
}

function draw(){
    board.draw();
    if(wolf.vivo==true){
        wolf.draw();
    }
    if(rabbit.vivo==true){
        rabbit.draw();
    }
    wolf.passou();
    rabbit.passou();
    hole.draw();
    hole.criaturas();
    rabbit.coelhofalece();
}