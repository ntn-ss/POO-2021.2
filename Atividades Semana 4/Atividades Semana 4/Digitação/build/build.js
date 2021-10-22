var Bubble = (function () {
    function Bubble(x, y, letter, speed) {
        this.alive = true;
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.speed = speed;
    }
    Bubble.prototype.update = function () {
        this.y += this.speed;
    };
    Bubble.prototype.draw = function () {
        fill(255);
        stroke(255);
        circle(this.x, this.y, Bubble.radius * 2);
        fill(0);
        stroke(0);
        textSize(15);
        text(this.letter, this.x - 5, this.y + 5);
    };
    Bubble.radius = 30;
    return Bubble;
}());
var Board = (function () {
    function Board() {
        this.timer = 0;
        this.hits = 0;
        this.mistakes = 0;
        this.bubbles = [new Bubble(100, 100, "a", 1)];
        this.bubbles.push(new Bubble(200, 100, "b", 2));
        this.bubbles.push(new Bubble(300, 100, "c", 3));
    }
    Board.prototype.update = function () {
        this.checkBubbleTime();
        this.markOutsideBubbles();
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            bubble.update();
        }
        this.removeDeadBubbles();
    };
    Board.prototype.checkBubbleTime = function () {
        this.timer -= 1;
        if (this.timer <= 0) {
            this.addBubble();
            this.timer = Board.timeOut;
        }
    };
    Board.prototype.markOutsideBubbles = function () {
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            if (bubble.y >= height) {
                bubble.alive = false;
                this.mistakes++;
            }
        }
    };
    Board.prototype.removeDeadBubbles = function () {
        var vivas = [];
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            if (bubble.alive) {
                vivas.push(bubble);
            }
            this.bubbles = vivas;
        }
    };
    Board.prototype.removeByHit = function (code) {
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            if (bubble.letter[0].toUpperCase().charCodeAt(0) == code) {
                bubble.alive = false;
                this.hits++;
                break;
            }
        }
    };
    Board.prototype.addBubble = function () {
        var x = random(0, width - 2 * Bubble.radius);
        var y = -2 * Bubble.radius;
        var letter = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
        var speed = random(1, 5);
        var bubble = new Bubble(x, y, letter, speed);
        this.bubbles.push(bubble);
    };
    Board.prototype.draw = function () {
        stroke("white");
        fill("white");
        textSize(30);
        text("Hits: " + this.hits + ". Mistakes: " + this.mistakes + ".", 30, 30);
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var bubble = _a[_i];
            bubble.draw();
        }
    };
    Board.timeOut = 30;
    return Board;
}());
var Game = (function () {
    function Game() {
        this.activeState = this.gamePlay;
        this.board = new Board();
    }
    Game.prototype.gamePlay = function () {
        this.board.update();
        background(50, 50, 50);
        this.board.draw();
        if (this.board.mistakes > 5) {
            this.activeState = this.gameOver;
        }
    };
    Game.prototype.gameOver = function () {
        background(255, 0, 0);
        fill(0);
        textSize(100);
        text("Game Over", 100, height / 2);
    };
    return Game;
}());
var game;
function setup() {
    createCanvas(800, 600);
    frameRate(30);
    game = new Game();
}
function keyPressed() {
    game.board.removeByHit(keyCode);
}
function draw() {
    game.activeState();
}
//# sourceMappingURL=build.js.map