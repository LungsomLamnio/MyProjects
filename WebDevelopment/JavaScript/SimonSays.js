let gameSeq = [];
let userSeq = [];
let highScore = 0;

let btns = ["red", "yellow", "green", "pyrple"];

let level = 0;
let started = false;

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `level ${level}`;

    let ranIndx = Math.floor(Math.random() * 3);
    let ranBtn = btns[ranIndx];
    let btn = document.querySelector(`.${ranBtn}`);
    gameSeq.push(ranBtn);
    console.log(gameSeq);

    gameFlash(btn);
}

function checkSeq(indx) {
    console.log(userSeq);
    if(userSeq[indx] == gameSeq[indx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if(level > highScore) {
            highScore = level;
        }
        h3.innerHTML = `Game Over! <br>Your score is ${level} High Score is ${highScore} <br>Press any key to start!`;
        gameOver();
        resetGame();
    }
}

let buttons = document.querySelectorAll(".Box");
for(btn of buttons) {
    btn.addEventListener("click", function() {
        let btn = this;
        let color = btn.getAttribute("id");
        userSeq.push(color);
        userFlash(btn);

        checkSeq(userSeq.length-1);
    });
}

function resetGame() {
    level = 0;
    started = false;
    gameSeq = [];
    userSeq = [];
}

function gameOver() {
    let body = document.querySelector("body");
    body.style.backgroundColor = "red";
    setTimeout(function() {
        body.style.backgroundColor = "white";
    }, 150);
}