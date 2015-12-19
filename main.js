var bgimg=document.createElement("img");
bgimg.src="images/map.png";
var enemyimg=document.createElement("img");
enemyimg.src="images/enemy.jpg";
var tower1img=document.createElement("img");
tower1img.src="images/tower1.jpg";
var tower1btmimg=document.createElement("img");
tower1btmimg.src="images/tower1btm.jpg";
var canvas=document.getElementById("gamecanvas");
var ctx=canvas.getContext("2d");
var isbuilding=false;
var enemy={
  x:0,
  y:0
};
var cursor={
  x:0,
  y:0
}
$("#gamecanvas").mousemove(function(event){
  cursor.x=event.offsetX;cursor.y=event.offsetY;
});
$("#gamecanvas").click(function(){
  if(cursor.x>630&&cursor.x<672&&cursor.y>0&&cursor.y<32){
    isbuilding=!isbuilding
  }
});
function draw(){
  ctx.drawImage(bgimg,0,0);
  ctx.drawImage(enemyimg,enemy.x,enemy.y);
  ctx.drawImage(tower1btmimg,640,0);
  if(isbuilding==true){
  ctx.drawImage(tower1img,cursor.x,cursor.y);
  }
}
setInterval(draw,40);
