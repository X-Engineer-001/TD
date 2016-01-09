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
  direction:{x:0,y:1},
  waypointsdes:0,
  move:function(){
    this.x=this.x+(this.direction.x*(this.speed/FPS));
    this.y=this.y+(this.direction.y*(this.speed/FPS));
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
var waypoints=[
  {x:7*32,y:2*32},
  {x:4*32,y:2*32},
  {x:4*32,y:1*32},
  {x:2*32,y:1*32},
  {x:2*32,y:4*32},
  {x:1*32,y:4*32},
  {x:1*32,y:8*32},
  {x:4*32,y:8*32},
  {x:4*32,y:5*32},
  {x:6*32,y:5*32},
  {x:6*32,y:4*32},
  {x:10*32,y:4*32},
  {x:10*32,y:2*32},
  {x:12*32,y:2*32},
  {x:12*32,y:1*32},
  {x:20*32,y:1*32}
];
function iscollided(waypointsx,waypointsy,targetx,targety,targetwidth,targetheight){
  if(waypointsx>=targetx&&
    waypointsx<=targetx+targetwidth&&
    waypointsy>=targety&&
    waypointsy<=targety+targetheight
  ){
    return true;
  }else{
    return false;
  }
}
function canbuild(){
  for(var i=0;i<waypoint.length;i++){
    if((waypoint[i].x=cursor.x-(cursor.x%32)&&((
      cursor.y-(cursor.y%32)<=waypoint[i].y&&
      cursor.y-(cursor.y%32)>=waypoint[i+1].y)||(
      cursor.y-(cursor.y%32)>=waypoint[i].y&&
      cursor.y-(cursor.y%32)<=waypoint[i+1].y)))||
     (waypoint[i].y=cursor.y-(cursor.y%32)&&((
      cursor.x-(cursor.x%32)<=waypoint[i].x&&
      cursor.x-(cursor.x%32)>=waypoint[i+1].x)||(
      cursor.x-(cursor.x%32)>=waypoint[i].x&&
      cursor.x-(cursor.x%32)<=waypoint[i+1].x))
     )
  ){
      return false;
    }
  }
  return true;
}
$("#gamecanvas").mousemove(function(event){
  cursor.x=event.offsetX;
  cursor.y=event.offsetY;
});
$("#gamecanvas").click(function(){

  if(cursor.x>640&&cursor.x<672&&cursor.y>0&&cursor.y<32){
    isbuilding=!isbuilding
  }
  if(isbuilding==true&&cursor.x<640&&canbuild()){
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
