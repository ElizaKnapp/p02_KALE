/*
#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09
*/

var c = document.getElementById("board");

var ctx = c.getContext("2d");

var requestID;

var playGame = (e) => {
  console.log("game")
  mouseX = e.offsetX;
  mouseY = e.offsetY;
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.arc(mouseX, mouseY, 50, 0, 2 * Math.PI);
  ctx.stroke();
};

c.addEventListener("click", playGame)
