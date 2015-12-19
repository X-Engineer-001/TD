var bgimg=document.createElement("img");
bgimg.src="images/map.png";
var enemyimg=document.createElement("img");
enemyimg.src="images/enemy.jpg";
var tower1img=document.createElement("img");
tower1img.src="images/tower1.jpg";
var canvas=document.getElementById("gamecanvas");
var ctx=canvas.getContext("2d");
var enemy={
  x:0,
  y:0
};
var cursor={
  x:0
  y:0
}
$("#gamecanvas").mousemove(fuction(event){cursor.x=event.pageX;cursor.y=event.pageY;})
function draw(){
  ctx.drawImage(bgimg,0,0);
  ctx.drawImage(enemyimg,enemy.x,enemy.y);
  ctx.drawImage(tower1img,cursor.x,cursor.y);
}
setInterval(draw,40);
