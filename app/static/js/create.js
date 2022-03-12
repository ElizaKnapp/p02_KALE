/*
#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09
*/

var c = document.getElementById("board");
var setupButton = document.getElementById("setup");
var doneButton = document.getElementById("done");
var ctx = c.getContext("2d");

// HARD CODED, FIX LATER
var size = 5;
if (size == 0) {
  size = 1;
}

// THE BOARD BEING CREATED
var board = [];
for (let i = 0; i < size; i++) {
  to_add = [];
  for (let j = 0; j < size; j++) {
    to_add[j] = 0;
  }
  board[i] = to_add;
}

var setup = () => {
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

var colorCell = (x, y) =>{
    var boxWidth = (c.clientWidth / size);
    var boxHeight = (c.clientHeight / size)
    ctx.fillStyle = "red"
    ctx.fillRect(x * boxWidth, y * boxHeight, boxWidth, boxHeight)

    // make the red square a bomb!
    board[x][y] = 1
}


var playGame = (e) => {
  console.log("game")
  var mouseX = e.offsetX;
  var mouseY = e.offsetY;

  var cellX = Math.floor(mouseX / (c.clientWidth / size));
  var cellY = Math.floor(mouseY / (c.clientHeight / size));

  colorCell(cellX, cellY);


};

var finish_board = (e) => {
  console.log("user has decided that this is the final state");
  console.log(board);

  var input = document.forms["board_done"]['board'];
  console.log(input.value);
  input.setAttribute('value', board);
  console.log(input.value);

}

setupButton.addEventListener("click", setup);
doneButton.addEventListener("click", finish_board);