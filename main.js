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
var clock=0;
var enemyclock=1;
var playerhp=100;
var waypoints1=[
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
var waypoints2=[
  {x:7*32,y:2*32},
  {x:4*32,y:2*32},
  {x:4*32,y:1*32},
  {x:2*32,y:1*32},
  {x:2*32,y:4*32},
  {x:1*32,y:4*32},
  {x:1*32,y:13*32},
  {x:3*32,y:13*32},
  {x:3*32,y:11*32},
  {x:5*32,y:11*32},
  {x:5*32,y:12*32},
  {x:7*32,y:12*32},
  {x:7*32,y:9*32},
  {x:6*32,y:9*32},
  {x:6*32,y:7*32},
  {x:12*32,y:7*32},
  {x:12*32,y:5*32},
  {x:14*32,y:5*32},
  {x:14*32,y:4*32},
  {x:20*32,y:4*32}
];
var waypoints3=[
  {x:7*32,y:2*32},
  {x:4*32,y:2*32},
  {x:4*32,y:1*32},
  {x:2*32,y:1*32},
  {x:2*32,y:4*32},
  {x:1*32,y:4*32},
  {x:1*32,y:13*32},
  {x:3*32,y:13*32},
  {x:3*32,y:11*32},
  {x:5*32,y:11*32},
  {x:5*32,y:12*32},
  {x:7*32,y:12*32},
  {x:7*32,y:9*32},
  {x:12*32,y:9*32},
  {x:12*32,y:11*32},
  {x:16*32,y:11*32},
  {x:16*32,y:9*32},
  {x:14*32,y:9*32},
  {x:14*32,y:7*32},
  {x:16*32,y:7*32},
  {x:16*32,y:6*32},
  {x:20*32,y:6*32}
];
var waypoints4=[
  {x:7*32,y:2*32},
  {x:4*32,y:2*32},
  {x:4*32,y:1*32},
  {x:2*32,y:1*32},
  {x:2*32,y:4*32},
  {x:1*32,y:4*32},
  {x:1*32,y:13*32},
  {x:3*32,y:13*32},
  {x:3*32,y:11*32},
  {x:5*32,y:11*32},
  {x:5*32,y:12*32},
  {x:7*32,y:12*32},
  {x:7*32,y:9*32},
  {x:12*32,y:9*32},
  {x:12*32,y:11*32},
  {x:9*32,y:11*32},
  {x:9*32,y:13*32},
  {x:18*32,y:13*32},
  {x:18*32,y:9*32},
  {x:20*32,y:9*32}
];
function Enemy(){
  this.x=224,
  this.y=0,
  this.speed=64,
  this.hp=,
  this.direction={x:0,y:1},
  this.waypointsdes=0,
  this.waypointschoice=function(){
    this.choiceflag=Math.floor(Math.random()*4);
    if(this.choiceflag==0){
      this.choice=waypoints1
    }else if(this.choiceflag==1){
      this.choice=waypoints2
    }else if(this.choiceflag==2){
      this.choice=waypoints3
    }else if(this.choiceflag==3){
      this.choice=waypoints4
    }
  },
  this.move=function(){
    if(iscollided(this.choice[this.waypointsdes].x,
      this.choice[this.waypointsdes].y,
      this.x,this.y,this.speed/FPS,this.speed/FPS
    )){
      if(this.waypointsdes==this.choice.length-1){
        this.hp=0;
        playerhp=playerhp-10;
      }else{
      this.x=this.choice[this.waypointsdes].x;
      this.y=this.choice[this.waypointsdes].y;
      this.waypointsdes=this.waypointsdes+1;
      this.direction=getunitvector(
        this.x,this.y,
        this.choice[this.waypointsdes].x,
        this.choice[this.waypointsdes].y
      );
      }
    }else{
      this.x=this.x+(this.direction.x*(this.speed/FPS));
      this.y=this.y+(this.direction.y*(this.speed/FPS));
    }
  }
};
var enemies=[];
var tower1={
  x:-1,
  y:-1
};
var cursor={
  x:0,
  y:0
};
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
function canbuild1(){
  for(var i=0;i<waypoints1.length-1;i++){
    if(
        (
          waypoints1[i].x==(cursor.x-(cursor.x%32)) &&
          waypoints1[i+1].x==(cursor.x-(cursor.x%32)) &&
          (
            (
              cursor.y-(cursor.y%32)<=waypoints1[i].y&&
              cursor.y-(cursor.y%32)>=waypoints1[i+1].y
            )||(
              cursor.y-(cursor.y%32)>=waypoints1[i].y&&
              cursor.y-(cursor.y%32)<=waypoints1[i+1].y
            )
          )
        )||(
          waypoints1[i].y==(cursor.y-(cursor.y%32)) &&
          waypoints1[i+1].y==(cursor.y-(cursor.y%32)) &&
          (
            (
              cursor.x-(cursor.x%32)<=waypoints1[i].x&&
              cursor.x-(cursor.x%32)>=waypoints1[i+1].x
            )||(
              cursor.x-(cursor.x%32)>=waypoints1[i].x&&
              cursor.x-(cursor.x%32)<=waypoints1[i+1].x
            )
          )
     )
  ){
      return false;
    }
  }
  return true;
}
function canbuild2(){
  for(var i=0;i<waypoints2.length-1;i++){
    if(
        (
          waypoints2[i].x==(cursor.x-(cursor.x%32)) &&
          waypoints2[i+1].x==(cursor.x-(cursor.x%32)) &&
          (
            (
              cursor.y-(cursor.y%32)<=waypoints2[i].y&&
              cursor.y-(cursor.y%32)>=waypoints2[i+1].y
            )||(
              cursor.y-(cursor.y%32)>=waypoints2[i].y&&
              cursor.y-(cursor.y%32)<=waypoints2[i+1].y
            )
          )
        )||(
          waypoints2[i].y==(cursor.y-(cursor.y%32)) &&
          waypoints2[i+1].y==(cursor.y-(cursor.y%32)) &&
          (
            (
              cursor.x-(cursor.x%32)<=waypoints2[i].x&&
              cursor.x-(cursor.x%32)>=waypoints2[i+1].x
            )||(
              cursor.x-(cursor.x%32)>=waypoints2[i].x&&
              cursor.x-(cursor.x%32)<=waypoints2[i+1].x
            )
          )
     )
  ){
      return false;
    }
  }
  return true;
}
function canbuild3(){
  for(var i=0;i<waypoints3.length-1;i++){
    if(
        (
          waypoints3[i].x==(cursor.x-(cursor.x%32)) &&
          waypoints3[i+1].x==(cursor.x-(cursor.x%32)) &&
          (
            (
              cursor.y-(cursor.y%32)<=waypoints3[i].y&&
              cursor.y-(cursor.y%32)>=waypoints3[i+1].y
            )||(
              cursor.y-(cursor.y%32)>=waypoints3[i].y&&
              cursor.y-(cursor.y%32)<=waypoints3[i+1].y
            )
          )
        )||(
          waypoints3[i].y==(cursor.y-(cursor.y%32)) &&
          waypoints3[i+1].y==(cursor.y-(cursor.y%32)) &&
          (
            (
              cursor.x-(cursor.x%32)<=waypoints3[i].x&&
              cursor.x-(cursor.x%32)>=waypoints3[i+1].x
            )||(
              cursor.x-(cursor.x%32)>=waypoints3[i].x&&
              cursor.x-(cursor.x%32)<=waypoints3[i+1].x
            )
          )
     )
  ){
      return false;
    }
  }
  return true;
}
function canbuild4(){
  for(var i=0;i<waypoints4.length-1;i++){
    if(
        (
          waypoints4[i].x==(cursor.x-(cursor.x%32)) &&
          waypoints4[i+1].x==(cursor.x-(cursor.x%32)) &&
          (
            (
              cursor.y-(cursor.y%32)<=waypoints4[i].y&&
              cursor.y-(cursor.y%32)>=waypoints4[i+1].y
            )||(
              cursor.y-(cursor.y%32)>=waypoints4[i].y&&
              cursor.y-(cursor.y%32)<=waypoints4[i+1].y
            )
          )
        )||(
          waypoints4[i].y==(cursor.y-(cursor.y%32)) &&
          waypoints4[i+1].y==(cursor.y-(cursor.y%32)) &&
          (
            (
              cursor.x-(cursor.x%32)<=waypoints4[i].x&&
              cursor.x-(cursor.x%32)>=waypoints4[i+1].x
            )||(
              cursor.x-(cursor.x%32)>=waypoints4[i].x&&
              cursor.x-(cursor.x%32)<=waypoints4[i+1].x
            )
          )
     )
  ){
      return false;
    }
  }
  return true;
}
function getunitvector(srcx,srcy,targetx,targety){
  return {
    x:(targetx-srcx)/Math.sqrt(Math.pow(targetx-srcx,2)+Math.pow(targety-srcy,2)),
    y:(targety-srcy)/Math.sqrt(Math.pow(targetx-srcx,2)+Math.pow(targety-srcy,2))
  };
}
$("#gamecanvas").mousemove(function(event){
  cursor.x=event.offsetX;
  cursor.y=event.offsetY;
});
$("#gamecanvas").click(function(){

  if(cursor.x>640&&cursor.x<672&&cursor.y>0&&cursor.y<32){
    isbuilding=!isbuilding
  }
  if(isbuilding==true&&cursor.x<640&&canbuild1()&&canbuild2()&&canbuild3()&&canbuild4()){
    tower1.x=cursor.x-(cursor.x%32);
    tower1.y=cursor.y-(cursor.y%32);
  }
});
function draw(){
  clock=clock+1;
  if((clock%(FPS+enemyclock))==0){
    enemyclock=(Math.floor(Math.random()*11)+5)*10;
    var newenemy=new Enemy();
    enemies.push(newenemy);
    enemies[enemies.length-1].waypointschoice();
  }
  ctx.drawImage(bgimg,0,0);
  ctx.drawImage(tower1btnimg,640,0);
  for(var i=0;i<enemies.length;i++){
    enemies[i].move();
    if(enemies[i].hp<=0){
      enemies.splice(i,1);
    }else{
    ctx.drawImage(enemyimg,enemies[i].x,enemies[i].y);
    }
  }
  if(isbuilding==true){
      ctx.drawImage(tower1img,cursor.x-(cursor.x%32),cursor.y-(cursor.y%32));
  }
  if(tower1.x!=-1&&tower1.y!=-1){
    ctx.drawImage(tower1img,tower1.x,tower1.y);
  }
  ctx.fillText("HP:"+playerhp,16,32);
}
setInterval(draw,1000/FPS);
