var FPS=60;
var bgimg=document.createElement("img");
bgimg.src="images/map.png";
var enemyimg=document.createElement("img");
enemyimg.src="images/enemy.jpg";
var tower1img=document.createElement("img");
tower1img.src="images/tower1.jpg";
var tower1btnimg=document.createElement("img");
tower1btnimg.src="images/tower1btn.jpg";
var canvas=document.getElementById("gamecanvas");
var ctx=canvas.getContext("2d");
var isbuilding=false;
var enemy={
  x:224,
  y:0,
  speed:64,
  direction:{x:0,y:-1},
  move:function(){
    enemy.x=enemy.x+(enemy.direction.x*(speed/FPS));
    enemy.y=enemy.y+(enemy.direction.y*(speed/FPS));
  }
};
var tower={
  x:-1,
  y:-1
};
var cursor={
  x:0,
  y:0
};
$("#gamecanvas").mousemove(function(event){
  cursor.x=event.offsetX;
  cursor.y=event.offsetY;
});
$("#gamecanvas").click(function(){
  if(cursor.x>640&&cursor.x<672&&cursor.y>0&&cursor.y<32){
    isbuilding=!isbuilding
  }
  if(isbuilding==true&&cursor.x<640){
    tower.x=cursor.x-(cursor.x%32);
    tower.y=cursor.y-(cursor.y%32);
  }
});
function draw(){
  ctx.drawImage(bgimg,0,0);
  ctx.drawImage(enemyimg,enemy.x,enemy.y);
  ctx.drawImage(tower1btnimg,640,0);
  if(isbuilding==true){
      ctx.drawImage(tower1img,cursor.x-(cursor.x%32),cursor.y-(cursor.y%32));
  }
  if(tower.x!=-1&&tower.y!=-1){
    ctx.drawImage(tower1img,tower.x,tower.y);
  }
  enemy.move();
}
setInterval(draw,1000/FPS);
