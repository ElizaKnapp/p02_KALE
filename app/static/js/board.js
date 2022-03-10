// EELs :: Eliza Knapp, Ella Krechmer, Lucas Lee
// SoftDev pd0
// K31 -- animation with JS
// 2022-02-15

var c = document.getElementById("board");
var ctx = c.getContext("2d");


board = board.replace(/(\r\n|\n|\r)/gm, "").replace(/ /g,"");
var size = Math.sqrt(board.length);


var hDividerHeight = c.height / size;
var vDividerHeight = c.width / size;

var drawHorizontalDividers = function(height){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(c.width, height);
    ctx.stroke();

    if(height + hDividerHeight < c.height) drawHorizontalDividers(height + hDividerHeight);
}

var drawVerticalDividers = function(width){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.lineTo(width, c.height);
    ctx.stroke();

    if(width + vDividerHeight < c.width) drawVerticalDividers(width + vDividerHeight);
}

var fillBombs

drawHorizontalDividers(0);
drawVerticalDividers(0);
