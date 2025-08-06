let stBtn = document.querySelector("#startGame");
let started = false;
let gameSeq = [];
let userSeq = [];
let level = 0;
let highScore = 0;

let highMsg = document.querySelector("#highestScore");
highMsg.innerHTML = `Your Highest Score till now is <b>${highScore}</b>`;

h2 = document.querySelector("h2");
let colors = ["red", "blue", "yellow", "darkBlue"];

function startGame() {
    started = true;
        document.querySelector("#startGame").innerHTML = "End Game";
        levelUpFlash();
        setTimeout(levelUp, 1000);
}
stBtn.addEventListener("click", function() {
    if (!started) {
        startGame();
    } else {
        reset()
    }
});

let gameflash = (btn) => {
    btn.classList.add("gameflash");
    setTimeout(() => {
        btn.classList.remove("gameflash");
    }, 500);
}

let userFlash = (btn) => {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 500);
}

let gameOverFlash = () => {
    let body = document.querySelector("body");
    body.classList.add("game-over-flash");
    setTimeout(() => {
        body.classList.remove("game-over-flash")
    }, 500);
}

let levelUpFlash = () => {
    let gameArea = document.querySelector("#gameArea");
    gameArea.classList.add("level-up-flash");
    setTimeout(() => {
        gameArea.classList.remove("level-up-flash")
    }, 500);
}

let levelUp = () => {
    level++;
    h2.innerHTML = `Level ${level}`;
    let randColor = colors[Math.floor(Math.random() * colors.length)];
    let btn = document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);
    userSeq = [];
    gameflash(btn);
}

function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            levelUpFlash();
            setTimeout(levelUp, 1000);
            if(level > highScore) highScore = level;
        }
    } else {
        h2.innerHTML = `Game Over. Your score was <b>${level}</b><br> Press start button to play again`;
        let para = document.querySelector("para");
        if(level > highScore) highScore = level;
        reset();
    }
}

function buttonPressed() {
    if (!started){
        return;
    };

    userFlash(this);
    userSeq.push(this.id);
    checkAnswer(userSeq.length - 1);
}

let btns = document.querySelectorAll(".colorButton");
for(let btn of btns) {
    btn.addEventListener("click", buttonPressed);
}

function reset(){
    gameOverFlash();
    gameSeq = [];
    level = 0;
    userSeq = 0;
    started = false;
    stBtn.innerText = "Start game";
    highMsg.innerHTML = `Your Highest Score till now is <b>${highScore}</b>`;
} 
