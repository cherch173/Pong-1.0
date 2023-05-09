// ** CONSTANTS ** //

const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "whitesmoke";
const paddle1Color = "firebrick";
const paddle2Color = "dodgerblue";
const paddleBorder = "black";
const puckColor = "darkslategray";
const puckBorderColor = "black";
const puckRadius = 15;
const paddleSpeed = 50;
let intervalID;
let puckSpeed;
let puckX = gameWidth / 2;
let puckY = gameHeight / 2;
let puckXDirection = 0;
let puckYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};

let winner

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    createPuck();
    nextTick();
};
function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        movePuck();
        drawPuck(puckX, puckY);
        checkCollision();
        nextTick();
    }, 10)
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function drawPaddles(){
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
function createPuck(){
    puckSpeed = 1;
    if(Math.round(Math.random()) == 1){
        puckXDirection =  1; 
    }
    else{
        puckXDirection = -1; 
    }
    if(Math.round(Math.random()) == 1){
        puckYDirection = Math.random() * 1; //more random directions
    }
    else{
        puckYDirection = Math.random() * -1; //more random directions
    }
    puckX = gameWidth / 2;
    puckY = gameHeight / 2;
    drawPuck(puckX, puckY);
};
function movePuck(){
    puckX += (puckSpeed * puckXDirection);
    puckY += (puckSpeed * puckYDirection);
};
function drawPuck(puckX, puckY){
    ctx.fillStyle = puckColor;
    ctx.strokeStyle = puckBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(puckX, puckY, puckRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
function checkCollision(){
    if(puckY <= 0 + puckRadius){
        puckYDirection *= -1;
    }
    if(puckY >= gameHeight - puckRadius){
        puckYDirection *= -1;
    }
    if(puckX <= 0){
        player2Score+=1;
        updateScore();
        createPuck();
        return;
    }
    if(puckX >= gameWidth){
        player1Score+=1;
        updateScore();
        createPuck();
        return;
    }
    if(puckX <= (paddle1.x + paddle1.width + puckRadius)){
        if(puckY > paddle1.y && puckY < paddle1.y + paddle1.height){
            puckX = (paddle1.x + paddle1.width) + puckRadius; // if puck gets stuck
            puckXDirection *= -1;
            puckSpeed += 1;
        }
    }
    if(puckX >= (paddle2.x - puckRadius)){
        if(puckY > paddle2.y && puckY < paddle2.y + paddle2.height){
            puckX = paddle2.x - puckRadius; // puck gets stuck
            puckXDirection *= -1;
            puckSpeed += 1;
        }
    }
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keyPressed){
        case(paddle1Up):
            if(paddle1.y > 0){
                paddle1.y -= paddleSpeed;
            }
            break;
        case(paddle1Down):
            if(paddle1.y < gameHeight - paddle1.height){
                paddle1.y += paddleSpeed;
            }
            break;
        case(paddle2Up):
            if(paddle2.y > 0){
                paddle2.y -= paddleSpeed;
            }
            break;
        case(paddle2Down):
            if(paddle2.y < gameHeight - paddle2.height){
                paddle2.y += paddleSpeed;
            }
            break;
    }
};
function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score}`;
};

function getWinner() {
    if (`${player1score} >= 5`) {
        return winner;
    } else if (`${player2Score} >= 5`) {
        return winner;
    }
}

function resetGame(){
    player1Score = 0;
    player2Score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };
    puckSpeed = 1;
    puckX = 0;
    puckY = 0;
    puckXDirection = 0;
    puckYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};



