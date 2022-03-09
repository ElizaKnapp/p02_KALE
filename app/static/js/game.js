/*
#Name — Andrew Juang, Eliza Knapp, Ella Krechmer, Lucas Lee
#Softdev
#P02: Client-Side Shenanigans
#2022-03-09
*/

var c = document.getElementById("board");
var startButton = document.getElementById("startGame");

var ctx = c.getContext("2d");

var playGame = () => {
  console.log("playing");
}

startButton.addEventListener("click", playGame)
