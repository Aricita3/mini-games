const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;
let direction;
let game;
document.addEventListener("keydown", setDirection);
document.getElementById("reiniciar-juego").addEventListener("click", reiniciarJuego);

function setDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            ctx.fillStyle = "#4B8F29"; 
        } else {
            ctx.fillStyle = "#6DBE45"; 
        }
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

   
    if (
        snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        document.getElementById("game-over-message").textContent = "¡Game Over!";
    } else {
        snake.unshift(newHead);
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function reiniciarJuego() {
   
    clearInterval(game);
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    direction = null;
    score = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("game-over-message").textContent = "";
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    game = setInterval(drawGame, 150); 
}

game = setInterval(drawGame, 150); 
