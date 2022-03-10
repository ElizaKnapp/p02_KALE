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
  for (let i = 0; i < 8; i += 1) {
    var inc = c.clientWidth / 8;
    ctx.beginPath();
    ctx.moveTo(i * inc, 0);
    ctx.lineTo(i * inc, 400);
    ctx.stroke();
  }
  // horizontal lines
  for (let i = 0; i < 8; i += 1) {
    var inc = c.clientHeight / 8;
    ctx.beginPath();
    ctx.moveTo(0, i * inc);
    ctx.lineTo(400, i * inc);
    ctx.stroke();
  }

  
};

var playGame = (e) => {
  // TODO!!!
  // monitor the mouse positions for where you click
  // run that click through some checker in python
  // get the result
  // display accordingly

  // DUMMY CODE MAKES CIRCLES
  console.log("game")
  mouseX = e.offsetX;
  mouseY = e.offsetY;
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.arc(mouseX, mouseY, 50, 0, 2 * Math.PI);
  ctx.stroke();
};

clearButton.addEventListener("click", clear);
setupButton.addEventListener("click", setup);
c.addEventListener("click", playGame);

