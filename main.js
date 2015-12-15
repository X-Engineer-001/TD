var bgimg=document.createElement("img");
bgimg.src="images/map.png";
var enemyimg=document.createElement("img");
enemyimg.src="images/enemy.jpg";
var canvas=document.getElementById("gamecanvas");
var ctx=canvas.getContext("2d");
var enemy={
  x:0,
  y:0
};
function draw(){
  ctx.drawImage(bgimg,0,0);
  ctx.drawImage(enemyimg,enemy.x,enemy.y);
}
setInterval(draw,40);
