var canvas, ctx;

window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    document.addEventListener("keydown", keyDownEvent);
    console.log("Snake Game")
    var x = 8;
    setInterval(draw, 1000/8);
};


var keyDownEvent = (e) => {
    switch (e.keyCode) {
        case 37:
            nextX = -1;
            nextY = 0;
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            break;
    }
}

var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = 10;
var snakeY = 10;

var gridSize = 20;
var tileSize = 20;
var nextX =0; 
var nextY = 0;

var appleX =  15;
var appleY = 15;
var apples =0;


var draw = () => {
    snakeX += nextX;
    snakeY += nextY;

    if (snakeX < 0) {
        snakeX = gridSize - 1;
    } 

    if (snakeX > gridSize - 1) {
        snakeX = 0;
    }
    
    if (snakeY < 0) {
        snakeY = gridSize - 1;
    }
    
    if (snakeY > gridSize - 1) {
        snakeY = 0;
    }

    var score = document.getElementById('score');
    if (snakeX == appleX && snakeY == appleY) {
        tailSize++;
        appleX = Math.floor(Math.random() * gridSize)
        appleY = Math.floor(Math.random() * gridSize)
        apples++;
    }

    //draw the background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    //draw the snake
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );

        if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            tailSize = defaultTailSize;
            apples= 0;
        }
    }

    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

    snakeTrail.push({ x: snakeX, y: snakeY });
    while(snakeTrail.length > tailSize) {
        snakeTrail.shift();
    }
    document.getElementById('score').innerHTML = apples;

}


