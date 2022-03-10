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

var requestID;

var clear = (e) => {
  console.log("clear");
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};

var setup = (e) => {
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
};

var getCellStatus = (x, y) =>{
    return board[y][x];
};

var colorCell = (x, y) =>{
    var boxWidth = (c.clientWidth / size);
    var boxHeight = (c.clientHeight / size)
    ctx.fillStyle = "red"

    ctx.fillRect(x * boxWidth, y * boxHeight, boxWidth, boxHeight)
}


var playGame = (e) => {
  // TODO!!!
  // monitor the mouse positions for where you click
  // run that click through some checker in python
  // get the result
  // display accordingly

  // DUMMY CODE MAKES CIRCLES
  console.log("game")
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;

  var cellX = Math.floor(mouseX / (c.clientWidth / size));
  var cellY = Math.floor(mouseY / (c.clientHeight / size));

  console.log(getCellStatus(cellX, cellY));

  colorCell(cellX, cellY);


};

clearButton.addEventListener("click", clear);
setupButton.addEventListener("click", setup);
