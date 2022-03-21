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
};

let colorCell = (x, y) => {
    let borderWidth = 2;
    let boxWidth = (c.clientWidth / size);
    let boxHeight = (c.clientHeight / size);
    ctx.fillStyle = "red";

    ctx.fillRect(x * boxWidth + borderWidth/2, y * boxHeight + borderWidth/2, boxWidth - borderWidth, boxHeight - borderWidth);

    board[y][x] = 1;
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
