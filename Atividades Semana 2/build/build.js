var Entity = (function () {
    function Entity(x, y, step, vivo, image) {
        this.x = x;
        this.y = y;
        this.step = step;
        this.vivo = vivo;
        this.image = image;
    }
    Entity.prototype.draw = function () {
        image(this.image, this.x * this.step, this.y * this.step, this.step, this.step);
    };
    Entity.prototype.passou = function () {
        if (this.x <= -1) {
            this.x = board.nc - 1;
        }
        if (this.x >= board.nc) {
            this.x = 0;
        }
        if (this.y >= board.nl) {
            this.y = 0;
        }
        if (this.y <= -1) {
            this.y = board.nl - 1;
        }
    };
    Entity.prototype.coelhofalece = function () {
        if (rabbit.x == wolf.x && rabbit.y == wolf.y) {
            rabbit.vivo = false;
        }
    };
    return Entity;
}());
var Board = (function () {
    function Board(nc, nl, step, background) {
        this.nc = nc;
        this.nl = nl;
        this.step = step;
        this.background = background;
    }
    Board.prototype.draw = function () {
        image(this.background, 0, 0, this.nc * this.step, this.nl * this.step);
        for (var x = 0; x < this.nc; x++) {
            for (var y = 0; y < this.nl; y++) {
                noFill();
                stroke(0);
                strokeWeight(2);
                rect(x * this.step, y * this.step, this.step, this.step);
            }
        }
    };
    return Board;
}());
var Hazard = (function () {
    function Hazard(x, y, step, image) {
        this.x = x;
        this.y = y;
        this.step = step;
        this.image = image;
    }
    Hazard.prototype.draw = function () {
        image(this.image, this.x * this.step, this.y * this.step, this.step, this.step);
    };
    Hazard.prototype.criaturas = function () {
        if (wolf.x == hole.x && wolf.y == hole.y) {
            wolf.vivo = false;
        }
        if (rabbit.x == hole.x && rabbit.y == hole.y) {
            rabbit.y += 1;
        }
    };
    return Hazard;
}());
var wolf_img;
var wolf_img2;
var rabbit_img;
var board_img;
var hole_img;
var wolf;
var rabbit;
var board;
var hole;
var hole_x;
var hole_y;
function loadImg(path) {
    return loadImage(path, function () { return console.log("Loading " + path + " ok"); }, function () { return console.log("Loading " + path + " error"); });
}
function preload() {
    wolf_img = loadImg('../sketch/lobol.png');
    rabbit_img = loadImg('../sketch/coelho.png');
    board_img = loadImg('../sketch/grama.jpg');
    wolf_img2 = loadImg('../sketch/lobor.png');
    hole_img = loadImg('../sketch/buraco.png');
}
function keyPressed() {
    if (keyCode === LEFT_ARROW && wolf.vivo == true) {
        wolf.x--;
        wolf.image = wolf_img;
    }
    else if (keyCode === RIGHT_ARROW && wolf.vivo == true) {
        wolf.x++;
        wolf.image = wolf_img2;
    }
    else if (keyCode === UP_ARROW && wolf.vivo == true) {
        wolf.y--;
    }
    else if (keyCode === DOWN_ARROW && wolf.vivo == true) {
        wolf.y++;
    }
    if (keyCode === "A".charCodeAt(0) && rabbit.vivo == true) {
        rabbit.x--;
    }
    else if (keyCode === "D".charCodeAt(0) && rabbit.vivo == true) {
        rabbit.x++;
    }
    else if (keyCode === "W".charCodeAt(0) && rabbit.vivo == true) {
        rabbit.y--;
    }
    else if (keyCode === "S".charCodeAt(0) && rabbit.vivo == true) {
        rabbit.y++;
    }
}
function setup() {
    var size = 100;
    board = new Board(6, 4, size, board_img);
    hole_x = round(random(board.nc));
    hole_y = round(random(board.nl));
    wolf = new Entity(2, 2, size, true, wolf_img);
    rabbit = new Entity(1, 1, size, true, rabbit_img);
    hole = new Hazard(hole_x, hole_y, size, hole_img);
    createCanvas(board.nc * size, board.nl * size);
}
function draw() {
    board.draw();
    if (wolf.vivo == true) {
        wolf.draw();
    }
    if (rabbit.vivo == true) {
        rabbit.draw();
    }
    wolf.passou();
    rabbit.passou();
    hole.draw();
    hole.criaturas();
    rabbit.coelhofalece();
}
//# sourceMappingURL=build.js.map