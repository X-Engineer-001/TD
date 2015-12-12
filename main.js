var bgimg=document.createElement("img");
bgimg.src="images/map.png";
var chtimg=document.createElement("img");
chtimg.src="images/slime.gif";
var canvas=document.getElementsById("gamecanvas");
var ctx=canvas.getContext("2d");
function draw(){
  ctx.drawImage(bgimg,0,0);
  ctx.drawImage(chtimg,0,0);
}
setTimeout(draw,1000);
