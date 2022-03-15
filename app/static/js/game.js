/*
#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09
*/

let c = document.getElementById("board");
let clearButton = document.getElementById("clear");
let setupButton = document.getElementById("setup");

let ctx = c.getContext("2d");
let visited = [...Array(size)].map(e => Array(size).fill(false));
let flagged = [...Array(size)].map(e => Array(size).fill(false));

let imgArr = [];
for(let i = 1; i < 9; i++){
    imgArr[i] = new Image();
    imgArr[i].src = `static/img/${i}.png`;
}

let clear = (e) => {
    console.log("clear");

    visited = [...Array(size)].map(e => Array(size).fill(false));
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

let setup = (e) => {
    clear(e);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    // vertical lines
    for (let i = 0; i < size; i += 1) {
        let inc = c.clientWidth / size;
        ctx.beginPath();
        ctx.moveTo(i * inc, 0);
        ctx.lineTo(i * inc, 400);
        ctx.stroke();
    }
    // horizontal lines
    for (let i = 0; i < size; i += 1) {
        let inc = c.clientHeight / size;
        ctx.beginPath();
        ctx.moveTo(0, i * inc);
        ctx.lineTo(400, i * inc);
        ctx.stroke();
    }

    c.addEventListener("click", playGame);
    c.addEventListener("contextmenu", flagBomb);
};

let getCellStatus = (x, y) => {
    return board[y][x];
};

let colorCell = (x, y, color) => {
    let boxWidth = (c.clientWidth / size);
    let boxHeight = (c.clientHeight / size);
    ctx.fillStyle = color;

    ctx.fillRect(x * boxWidth, y * boxHeight, boxWidth, boxHeight);
}

let imageCell = (x, y, num) => {
    let boxWidth = (c.clientWidth / size);
    let boxHeight = (c.clientHeight / size);

    ctx.drawImage(imgArr[num], x * boxWidth, y * boxHeight, boxWidth, boxHeight);

}

let revealTile = (x, y) => {
    let status = getCellStatus(x, y);

    if (status == 1 || visited[x][y]) return;
    visited[x][y] = true;

    let sum = 0;
    let check = [-1, 0, 1];
    for (let dx of check)
        for (let dy of check) {
            if (x + dx >= 0 && x + dx < size && y + dy >= 0 && y + dy < size) {
                sum += getCellStatus(x + dx, y + dy);
                revealTile(x + dx, y + dy);
            }
        }

    if(sum == 0) colorCell(x, y, "grey");
    else if(sum <= 8) imageCell(x, y, sum);

}


let playGame = (e) => {
    console.log("game")
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    let cellX = Math.floor(mouseX / (c.clientWidth / size));
    let cellY = Math.floor(mouseY / (c.clientHeight / size));

    let status = getCellStatus(cellX, cellY);

    if (status == 0) revealTile(cellX, cellY);
    else if (status == 1) {
        colorCell(cellX, cellY, "red");
        // end game here
    }

};

let flagBomb = (e) => {
    e.preventDefault();

    let mouseX = e.offsetX;
    let mouseY = e.offsetY;

    let cellX = Math.floor(mouseX / (c.clientWidth / size));
    let cellY = Math.floor(mouseY / (c.clientHeight / size));


    if (!visited[cellX][cellY]) {
        if(!flagged[cellX][cellY]){
            flagged[cellX][cellY] = true;
            colorCell(cellX, cellY, "green");
        }
        else{
            flagged[cellX][cellY] = false;
            colorCell(cellX, cellY, "white");
        }
    }
}

clearButton.addEventListener("click", clear);
setupButton.addEventListener("click", setup);
