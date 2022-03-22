/*
#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09
*/

let c = document.getElementById("board");
let ctx = c.getContext("2d");

let restartButton = document.getElementById("restart");

let visited = [...Array(size)].map(e => Array(size).fill(false));
let flagged = [...Array(size)].map(e => Array(size).fill(false));

let nVisited = 0;

let nBombs = 0;
let nSafe = 0;

let getCellStatus = (x, y) => {
    return board[y][x];
};

let nums = [...Array(size)].map(e => Array(size).fill(0));

let calculateNum = (x, y) => {
    let sum = 0;
    let check = [-1, 0, 1];
    for (let dx of check)
    for (let dy of check) {
        if (x + dx >= 0 && x + dx < size && y + dy >= 0 && y + dy < size) {
            sum += getCellStatus(x + dx, y + dy);
        }
    }
    return sum;
}

const borderWidth = 2;
let imgArr = [];

for(let i = 1; i < 9; i++){
    imgArr[i] = new Image();
    imgArr[i].src = `static/img/${i}.png`;
}

let startTime = new Date().getTime();
let intervalID = -1;
let score = 0;

let updateDisplay = (time) => {
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
}

let stopTimer = () => {
    score = new Date().getTime() - startTime;
    clearInterval(intervalID);
}

let startTimer = () => {
    startTime =  new Date().getTime();
    intervalID = setInterval(() => {
        updateDisplay(new Date().getTime() - startTime);
    }, 1);
}


let clear = (e) => {
    console.log("clear");

    visited = [...Array(size)].map(e => Array(size).fill(false));
    flagged = [...Array(size)].map(e => Array(size).fill(false));

    nVisited = 0;
    nBombs = 0;
    nSafe = 0;

    stopTimer();
    document.getElementById("message").innerHTML = "";
    document.getElementById("timer").innerHTML = "";


    score = 0;
    intervalID = -1;

    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

let setup = (e) => {
    clear(e);


    ctx.strokeStyle = 'black';
    ctx.lineWidth = borderWidth;

    // vertical lines
    for (let i = 0; i < size; i += 1) {
        let inc = c.clientWidth / size;
        ctx.beginPath();
        ctx.moveTo(i * inc, 0);
        ctx.lineTo(i * inc, c.clientHeight);
        ctx.stroke();
    }
    // horizontal lines
    for (let i = 0; i < size; i += 1) {
        let inc = c.clientHeight / size;
        ctx.beginPath();
        ctx.moveTo(0, i * inc);
        ctx.lineTo(c.clientWidth, i * inc);
        ctx.stroke();
    }

    c.addEventListener("click", playGame);
    c.addEventListener("contextmenu", flagBomb);
};

let endGame = (message) => {
    c.removeEventListener("click", playGame);
    c.removeEventListener("contextmenu", flagBomb);

    stopTimer();

    document.getElementById("message").innerHTML = message;
}

let colorCell = (x, y, color) => {
    let boxWidth = (c.clientWidth / size);
    let boxHeight = (c.clientHeight / size);
    ctx.fillStyle = color;

    ctx.fillRect(x * boxWidth + borderWidth/2, y * boxHeight + borderWidth/2, boxWidth - borderWidth, boxHeight - borderWidth);
}

let imageCell = (x, y, num) => {
    // console.log("image", x, y, num);
    let boxWidth = (c.clientWidth / size);
    let boxHeight = (c.clientHeight / size);

    ctx.drawImage(imgArr[num], x * boxWidth + borderWidth/2, y * boxHeight + borderWidth/2, boxWidth - borderWidth, boxHeight - borderWidth);

}

let revealTile = (x, y) => {
    // console.log(x, y);
    let status = getCellStatus(x, y);

    if (status == 1 || visited[y][x]) return;
    visited[y][x] = true;
    nVisited++;

    let sum = nums[y][x];

    if(sum == 0) {
        colorCell(x, y, "grey");

        let check = [-1, 0, 1];
        for (let dx of check)
            for (let dy of check) {
                if (x + dx >= 0 && x + dx < size && y + dy >= 0 && y + dy < size) {
                    revealTile(x + dx, y + dy);
                }
            }
    }
    else if(sum <= 8) imageCell(x, y, sum);

    if(nVisited == nSafe && get_num_flagged() == nBombs){
        console.log("win");
        endGame("You Win!");
    }

}

let get_num_flagged = (e) => {
    let count = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (flagged[i][j]) {
                count += 1;
            }
        }
    }
    console.log("number of flags:" + count);
    return count;
};


let playGame = (e) => {
    console.log("game")
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    let cellX = Math.floor(mouseX / (c.clientWidth / size));
    let cellY = Math.floor(mouseY / (c.clientHeight / size));

    if(nVisited == 0) {
        generate_board(cellX, cellY);
        startTimer();
    }


    let status = getCellStatus(cellX, cellY);

    if (status == 0) revealTile(cellX, cellY);
    else if (status == 1) {
        console.log("lose");
        colorCell(cellX, cellY, "red");
        endGame("You Lose!");
    }

};


let generate_board = (x, y) => {
    console.log("generating")

    board = Array(size).fill().map(()=>Array(size).fill(0))
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            board[i][j] = 0
        }
    }

    // the +2 bombs are for the bombs that might be lost in adjustment
    num_mines = 12
    if (size < 15) {
        num_mines = size + 2
    } else if (size < 20) {
        num_mines = size * 2 + 2
    } else if (size < 40) {
        num_mines = size * 4 + 2
    }

    for (let i = 0; i < num_mines; i++) {
        x_hat = Math.floor(Math.random() * size)
        y_hat = Math.floor(Math.random() * size)
        board[y_hat][x_hat] = 1
    }

    let check = [-1, 0, 1];
    for (let dx of check) {
        for (let dy of check) {
            board[y + dy][x + dx] = 0;
        }
    }
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] == 1) {
                nBombs += 1;
            }
        }
    }

    console.log("number of bombs: " + nBombs);
    nSafe = size*size - nBombs;
    console.log("number of safes: " + nSafe);


    for(let y = 0; y < size; y++) for(let x = 0; x < size; x++){
        nums[y][x] = calculateNum(x, y);
    }


};

let flagBomb = (e) => {
    e.preventDefault();

    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    let cellX = Math.floor(mouseX / (c.clientWidth / size));
    let cellY = Math.floor(mouseY / (c.clientHeight / size));


    if (!visited[cellY][cellX]) {
        if(!flagged[cellY][cellX]){
            flagged[cellY][cellX] = true;
            colorCell(cellX, cellY, "green");
        }
        else{
            flagged[cellY][cellX] = false;
            colorCell(cellX, cellY, "white");
        }
    }
}

setup();
restartButton.addEventListener("click", setup);
