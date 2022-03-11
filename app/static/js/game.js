/*
#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09
*/

var c = document.getElementById("board");
var clearButton = document.getElementById("clear");
var setupButton = document.getElementById("setup");

var ctx = c.getContext("2d");
var visited = [...Array(size)].map(e => Array(size).fill(false));

var clear = (e) => {
    console.log("clear");

    visited = [...Array(size)].map(e => Array(size).fill(false));
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var setup = (e) => {
    clear(e);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    // vertical lines
    for (let i = 0; i < size; i += 1) {
        var inc = c.clientWidth / size;
        ctx.beginPath();
        ctx.moveTo(i * inc, 0);
        ctx.lineTo(i * inc, 400);
        ctx.stroke();
    }
    // horizontal lines
    for (let i = 0; i < size; i += 1) {
        var inc = c.clientHeight / size;
        ctx.beginPath();
        ctx.moveTo(0, i * inc);
        ctx.lineTo(400, i * inc);
        ctx.stroke();
    }

    c.addEventListener("click", playGame);
    c.addEventListener("contextmenu", flagBomb);
};

var getCellStatus = (x, y) => {
    return board[y][x];
};

var colorCell = (x, y, color) => {
    var boxWidth = (c.clientWidth / size);
    var boxHeight = (c.clientHeight / size)
    ctx.fillStyle = color

    ctx.fillRect(x * boxWidth, y * boxHeight, boxWidth, boxHeight)
}

var revealTile = (x, y) => {
    var status = getCellStatus(x, y);

    if (status == 1 || visited[x][y]) return;
    visited[x][y] = true;

    console.log(x, y);


    colorCell(x, y, "grey");

    var check = [-1, 0, 1];

    for (var dx of check)
        for (var dy of check) {
            console.log(dx, dy);
            if (x + dx >= 0 && x + dx < size && y + dy >= 0 && y + dy < size) {
                revealTile(x + dx, y + dy);
            }
        }


}


var playGame = (e) => {
    console.log("game")
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    var cellX = Math.floor(mouseX / (c.clientWidth / size));
    var cellY = Math.floor(mouseY / (c.clientHeight / size));

    var status = getCellStatus(cellX, cellY);

    if (status == 0) revealTile(cellX, cellY);
    else if (status == 1) colorCell(cellX, cellY, "red");

};

var flagBomb = (e) => {
    e.preventDefault();

    var mouseX = e.offsetX;
    var mouseY = e.offsetY;

    var cellX = Math.floor(mouseX / (c.clientWidth / size));
    var cellY = Math.floor(mouseY / (c.clientHeight / size));

    if (!visited[cellX][cellY]) colorCell(cellX, cellY, "green");
}

clearButton.addEventListener("click", clear);
setupButton.addEventListener("click", setup);
