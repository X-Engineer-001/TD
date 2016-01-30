var FPS=60;
var bgimg=document.createElement("img");
bgimg.src="images/map.png";
var enemyimg=document.createElement("img");
enemyimg.src="images/enemy.jpg";
var tower1img=document.createElement("img");
tower1img.src="images/tower1.jpg";
var tower1btnimg=document.createElement("img");
tower1btnimg.src="images/tower1btn.jpg";
var tower2img=document.createElement("img");
tower2img.src="images/tower2.jpg";
var tower2btnimg=document.createElement("img");
tower2btnimg.src="images/tower2btn.jpg";
var boximg=document.createElement("img");
boximg.src="images/box.png";
var hpimg=document.createElement("img");
hpimg.src="images/hp.png";
var enemyhpimg=document.createElement("img");
enemyhpimg.src="images/enemyhp.png";
var pauseimg=document.createElement("img");
pauseimg.src="images/pause.png";
var playimg=document.createElement("img");
playimg.src="images/play.png";
var crosshairimg=document.createElement("img");
crosshairimg.src="images/crosshair.png";
var canvas=document.getElementById("gamecanvas");
var ctx=canvas.getContext("2d");
var isbuilding=0;
var clock=0;
var enemyclock=0;
var enemyclockrandom=0;
var playerhp=9;
var pauseflag=false;
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
function iscollided(x,y,targetx,targety,targetwidth,targetheight){
  if((x>=targetx&&
    x<=targetx+targetwidth&&
    y>=targety&&
    y<=targety+targetheight)||(
    x<=targetx&&
    x>=targetx-targetwidth&&
    y<=targety&&
    y>=targety-targetheight
    )){
    return true;
  }else{
    return false;
  }
}
function Enemy(){
  this.x=224;
  this.y=0;
  this.speed=64;
  this.fullhp=10;
  this.hp=10;
  this.direction={x:0,y:1};
  this.waypointsdes=0;
  this.delay=0;
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
  };
  this.move=function(){
    if(this.direction.x==1&&iscollided((this.x-(this.x%32))+32,this.y,
      this.x,this.y,this.speed/FPS,this.speed/FPS
    )){
      this.x=(this.x-(this.x%32))+32;
    }
    if(this.direction.y==1&&iscollided(this.x,(this.y-(this.y%32))+32,
      this.x,this.y,this.speed/FPS,this.speed/FPS
    )){
      this.y=(this.y-(this.y%32))+32;
    }
    if(this.direction.x==-1&&iscollided((this.x-(this.x%32)),this.y,
      this.x,this.y,this.speed/FPS,this.speed/FPS
    )){
      this.x=(this.x-(this.x%32));
    }
    if(this.direction.y==-1&&iscollided(this.x,(this.y-(this.y%32)),
      this.x,this.y,this.speed/FPS,this.speed/FPS
    )){
      this.y=(this.y-(this.y%32));
    }
    if(this.x%32==0&&this.y%32==0&&this.delay<=0){
      this.delay=FPS/6;
    }
    if(this.delay>0){
      this.delay=this.delay-1;
    }
    if(this.delay<=0){
      if(iscollided(this.choice[this.waypointsdes].x,
        this.choice[this.waypointsdes].y,
        this.x,this.y,this.speed/FPS,this.speed/FPS
      )){
        if(this.waypointsdes==this.choice.length-1){
          this.hp=0;
          playerhp=playerhp-1;
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
      }
      if(this.speed/FPS<=32){
        this.x=this.x+(this.direction.x*(this.speed/FPS));
        this.y=this.y+(this.direction.y*(this.speed/FPS));
      }else{
        this.x=this.x+(this.direction.x*32);
        this.y=this.y+(this.direction.y*32);
      }
    }
  };
}
var enemies=[];
var cursor={
  x:0,
  y:0
};
function Tower1(){
  this.tower=1;
  this.x=cursor.x-(cursor.x%32);
  this.y=cursor.y-(cursor.y%32);
  this.range=100;
  this.reload=FPS*2;
  this.nowreload=FPS*2;
  this.attack=8;
  this.aimingid=null;
  this.shotting=0;
  this.serchenemy=function(){
    this.aimingid=null;
    for(var i=0;i<enemies.length;i++){
      if(Math.sqrt(Math.pow(enemies[i].x-this.x,2)+Math.pow(enemies[i].y-this.y,2))<=this.range){
        this.aimingid=i;
        break;
      }
    }
  };
}
function Tower2(){
  this.tower=2;
  this.x=cursor.x-(cursor.x%32);
  this.y=cursor.y-(cursor.y%32);
  this.range=100;
  this.reload=FPS/3;
  this.nowreload=FPS/3;
  this.attack=2;
  this.aimingid=null;
  this.shotting=0;
  this.serchenemy=function(){
    this.aimingid=null;
    for(var i=0;i<enemies.length;i++){
      if(Math.sqrt(Math.pow(enemies[i].x-this.x,2)+Math.pow(enemies[i].y-this.y,2))<=this.range){
        this.aimingid=i;
        break;
      }
    }
  };
}
var towers=[];
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
      console.log("Can't build !");
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
      console.log("Can't build !");
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
      console.log("Can't build !");
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
      console.log("Can't build !");
      return false;
    }
  }
  return true;
}
function canbuildT(){
  for(var i=0;i<towers.length;i++){
    if(cursor.x-(cursor.x%32)==towers[i].x&&cursor.y-(cursor.y%32)==towers[i].y){
      console.log("There's already a tower here !");
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
  if(cursor.x>640&&cursor.x<736&&cursor.y>64&&cursor.y<160){
    pauseflag=!pauseflag;
  }
  if(!pauseflag){
  if(cursor.x>640&&cursor.x<672&&cursor.y>0&&cursor.y<32){
    if(isbuilding!=1){
      isbuilding=1;
    }else{
      isbuilding=0;
    }
  }
  if(cursor.x>672&&cursor.x<704&&cursor.y>0&&cursor.y<32){
    if(isbuilding!=2){
      isbuilding=2;
    }else{
      isbuilding=0;
    }
  }
  if(isbuilding==1&&cursor.x<640&&canbuild1()&&canbuild2()&&canbuild3()&&canbuild4()&&canbuildT()){
    var newtower=new Tower1();
    towers.push(newtower);
  }
  if(isbuilding==2&&cursor.x<640&&canbuild1()&&canbuild2()&&canbuild3()&&canbuild4()&&canbuildT()){
    var newtower=new Tower2();
    towers.push(newtower);
  }
  }
});
function draw(){
  if(!pauseflag){
  clock=clock+1;
  enemyclock=enemyclock+1
  if(enemyclock%((((FPS*3)-((FPS*3)%4))/4)+enemyclockrandom)==0){
    enemyclock=0;
    enemyclockrandom=((Math.floor(Math.random()*121)*FPS)-((Math.floor(Math.random()*121)*FPS)%60))/60;
    var newenemy=new Enemy();
    enemies.push(newenemy);
    enemies[enemies.length-1].waypointschoice();
  }
  ctx.drawImage(bgimg,0,0);
  for(var i=0;i<towers.length;i++){
    towers[i].serchenemy();
    towers[i].nowreload=towers[i].nowreload-1;
    if(towers[i].aimingid!=null){
      if(iscollided(cursor.x,cursor.y,towers[i].x,towers[i].y,32,32)&&!isbuilding){
        ctx.drawImage(crosshairimg,enemies[towers[i].aimingid].x-4,enemies[towers[i].aimingid].y-4,40,40);
      }
      if(towers[i].nowreload<=0){
        towers[i].shotting=FPS/6;
        enemies[towers[i].aimingid].hp=enemies[towers[i].aimingid].hp-towers[i].attack;
        towers[i].nowreload=towers[i].reload;
      }
    }
    if(towers[i].tower==1){
      if(towers[i].shotting>0&&towers[i].aimingid!=null){
        ctx.beginPath();
        ctx.moveTo(towers[i].x+16,towers[i].y+16);
        ctx.lineTo(enemies[towers[i].aimingid].x+16,enemies[towers[i].aimingid].y+16);
        ctx.strokeStyle="rgb(255,0,0)";
        ctx.lineWidth="2";
        ctx.stroke();
        ctx.closePath();
        towers[i].shotting=towers[i].shotting-1;
      }
      ctx.drawImage(tower1img,towers[i].x,towers[i].y);
    }
    if(towers[i].tower==2){
      if(towers[i].shotting>0&&towers[i].aimingid!=null){
        ctx.beginPath();
        ctx.moveTo(towers[i].x+16,towers[i].y+16);
        ctx.lineTo(enemies[towers[i].aimingid].x+16,enemies[towers[i].aimingid].y+16);
        ctx.strokeStyle="rgb(0,0,255)";
        ctx.lineWidth="2";
        ctx.stroke();
        ctx.closePath();
        towers[i].shotting=towers[i].shotting-1;
      }
      ctx.drawImage(tower2img,towers[i].x,towers[i].y);
    }
  }
  for(var i=0;i<enemies.length;i++){
    enemies[i].move();
    if(enemies[i].hp<=0){
      enemies.splice(i,1);
    }else{
    ctx.drawImage(enemyimg,enemies[i].x,enemies[i].y);
    }
  }
  for(var i=0;i<enemies.length;i++){
    ctx.drawImage(enemyhpimg,(enemies[i].x+3),(enemies[i].y-5),((26/enemies[i].fullhp)*enemies[i].hp),3);
  }
  if(isbuilding==1){
      ctx.drawImage(tower1img,cursor.x-(cursor.x%32),cursor.y-(cursor.y%32));
  }
  if(isbuilding==2){
      ctx.drawImage(tower2img,cursor.x-(cursor.x%32),cursor.y-(cursor.y%32));
  }
  ctx.drawImage(boximg,640,0);
  ctx.drawImage(tower1btnimg,640,0);
  ctx.drawImage(tower2btnimg,672,0);
  if(playerhp==9){
    ctx.drawImage(hpimg,640,192);
    ctx.drawImage(hpimg,640,224);
    ctx.drawImage(hpimg,640,256);
    ctx.drawImage(hpimg,640,288);
    ctx.drawImage(hpimg,640,320);
    ctx.drawImage(hpimg,640,352);
    ctx.drawImage(hpimg,640,384);
    ctx.drawImage(hpimg,640,416);
    ctx.drawImage(hpimg,640,448);
  }else if(playerhp==8){
    ctx.drawImage(hpimg,640,224);
    ctx.drawImage(hpimg,640,256);
    ctx.drawImage(hpimg,640,288);
    ctx.drawImage(hpimg,640,320);
    ctx.drawImage(hpimg,640,352);
    ctx.drawImage(hpimg,640,384);
    ctx.drawImage(hpimg,640,416);
    ctx.drawImage(hpimg,640,448);
  }else if(playerhp==7){
    ctx.drawImage(hpimg,640,256);
    ctx.drawImage(hpimg,640,288);
    ctx.drawImage(hpimg,640,320);
    ctx.drawImage(hpimg,640,352);
    ctx.drawImage(hpimg,640,384);
    ctx.drawImage(hpimg,640,416);
    ctx.drawImage(hpimg,640,448);
  }else if(playerhp==6){
    ctx.drawImage(hpimg,640,288);
    ctx.drawImage(hpimg,640,320);
    ctx.drawImage(hpimg,640,352);
    ctx.drawImage(hpimg,640,384);
    ctx.drawImage(hpimg,640,416);
    ctx.drawImage(hpimg,640,448);
  }else if(playerhp==5){
    ctx.drawImage(hpimg,640,320);
    ctx.drawImage(hpimg,640,352);
    ctx.drawImage(hpimg,640,384);
    ctx.drawImage(hpimg,640,416);
    ctx.drawImage(hpimg,640,448);
  }else if(playerhp==4){
    ctx.drawImage(hpimg,640,352);
    ctx.drawImage(hpimg,640,384);
    ctx.drawImage(hpimg,640,416);
    ctx.drawImage(hpimg,640,448);
  }else if(playerhp==3){
    ctx.drawImage(hpimg,640,384);
    ctx.drawImage(hpimg,640,416);
    ctx.drawImage(hpimg,640,448);
  }else if(playerhp==2){
    ctx.drawImage(hpimg,640,416);
    ctx.drawImage(hpimg,640,448);
  }else if(playerhp==1){
    ctx.drawImage(hpimg,640,448);
  }
  ctx.drawImage(pauseimg,640,64);
}else{
  ctx.drawImage(playimg,640,64);
}
}
setInterval(draw,1000/FPS);
