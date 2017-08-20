var FPS=60;
var money=3;
var enemylevel=1;
var enemycount=1;
var moneytext=0;
var roadtext=0;
var towertext=0;
var towers=[];
var enemies=[];
var tutorialflag=0;
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
var tower3img=document.createElement("img");
tower3img.src="images/tower3.jpg";
var tower3btnimg=document.createElement("img");
tower3btnimg.src="images/tower3btn.jpg";
var boximg=document.createElement("img");
boximg.src="images/box.png";
var hpimg=document.createElement("img");
hpimg.src="images/hp.png";
var pointimg=document.createElement("img");
pointimg.src="images/point.png";
var enemyhpimg=document.createElement("img");
enemyhpimg.src="images/enemyhp.png";
var pauseimg=document.createElement("img");
pauseimg.src="images/pause.png";
var playimg=document.createElement("img");
playimg.src="images/play.png";
var crosshair1img=document.createElement("img");
crosshair1img.src="images/crosshair1.png";
var crosshair2img=document.createElement("img");
crosshair2img.src="images/crosshair2.png";
var crosshair3img=document.createElement("img");
crosshair3img.src="images/crosshair3.png";
var range1img=document.createElement("img");
range1img.src="images/range1.png";
var range2img=document.createElement("img");
range2img.src="images/range2.png";
var range3img=document.createElement("img");
range3img.src="images/range3.png";
var canvas=document.getElementById("gamecanvas");
var ctx=canvas.getContext("2d");
ctx.font="20px Arial";
ctx.fillStyle="rgb(224,224,224)";
var isbuilding=0;
var clock=0;
var enemyclock=0;
var enemyclockrandom=0;
var playerhp=9;
var autopauseflag=false;
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
function tutorial(){
  if(tutorialflag==0){
    if(enemies[0].y>=64){
      autopauseflag=true;
      $("div *").remove();
      $("div").append("<p>Oh! The enemy appeared... How ugly it is! Let's destroy it... Just click on one of three towers in the upper right corner.</p><p>The red one has high damage, but slow fire rate and small range.</p><p>The blue one has fast fire rate, but low damage and small range.</p><p>The pink one has high range, ordinary fire rate and damage. It's your choice.</p>");
      if(isbuilding){
        $("div *").remove();
        $("div").append("<p>That's it! When you'r building, the game will automatically paused.</p><p>You can also manually pause/play by clicking on the pixel pause/play icon below the three tower icons.</p><p>Now, build it by click on the brighter place.</p>");
      }
      if(towers[0]){
        $("div *").remove();
        $("div").append("<p>By the way, if you'r using \"chrome\" browser, you can also switch between 4 modes (play and building three towers) by scrolling the mouse wheel.</p><p>Now just click again on the tower icon that you choosed to play.</p>");
        if(!isbuilding){
          $("div *").remove();
          tutorialflag=tutorialflag+1;
        }
      }
    }
  }
}
function iscollided2(x,y,targetx,targety,targetwidth,targetheight){
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
function iscollided1(x,y,targetx,targety,targetwidth,targetheight){
  if(x>=targetx&&
    x<=targetx+targetwidth&&
    y>=targety&&
    y<=targety+targetheight){
    return true;
  }else{
    return false;
  }
}
function Enemy(){
  this.x=224;
  this.y=0;
  this.speed=64;
  this.level=enemylevel;
  this.fullhp=10*enemylevel;
  this.hp=10*enemylevel;
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
    if(this.direction.x==1&&iscollided2((this.x-(this.x%32))+32,this.y,
      this.x,this.y,this.speed/FPS,this.speed/FPS
    )){
      this.x=(this.x-(this.x%32))+32;
    }
    if(this.direction.y==1&&iscollided2(this.x,(this.y-(this.y%32))+32,
      this.x,this.y,this.speed/FPS,this.speed/FPS
    )){
      this.y=(this.y-(this.y%32))+32;
    }
    if(this.direction.x==-1&&iscollided2((this.x-(this.x%32)),this.y,
      this.x,this.y,this.speed/FPS,this.speed/FPS
    )){
      this.x=(this.x-(this.x%32));
    }
    if(this.direction.y==-1&&iscollided2(this.x,(this.y-(this.y%32)),
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
      if(iscollided2(this.choice[this.waypointsdes].x,
        this.choice[this.waypointsdes].y,
        this.x,this.y,this.speed/FPS,this.speed/FPS
      )){
        if(this.waypointsdes==this.choice.length-1){
          this.hp=0;
          playerhp=playerhp-1;
          money=money-1;
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
var cursor={
  x:0,
  y:0
};
function Tower1(){
  this.level=1;
  this.tower=1;
  this.x=cursor.x-(cursor.x%32);
  this.y=cursor.y-(cursor.y%32);
  this.range=80;
  this.reload=FPS*3;
  this.nowreload=FPS*3;
  this.attack=9;
  this.aimingid=null;
  this.shottingx=null;
  this.shottingy=null;
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
var initialrange1=80;
function Tower2(){
  this.level=1;
  this.tower=2;
  this.x=cursor.x-(cursor.x%32);
  this.y=cursor.y-(cursor.y%32);
  this.range=100;
  this.reload=FPS/3;
  this.nowreload=FPS/3;
  this.attack=1.5;
  this.aimingid=null;
  this.shottingx=null;
  this.shottingy=null;
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
var initialrange2=100;
function Tower3(){
  this.level=1;
  this.tower=3;
  this.x=cursor.x-(cursor.x%32);
  this.y=cursor.y-(cursor.y%32);
  this.range=200;
  this.reload=FPS*3/2;
  this.nowreload=FPS*3/2;
  this.attack=4;
  this.aimingid=null;
  this.shottingx=null;
  this.shottingy=null;
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
var initialrange3=200;
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
      roadtext=FPS;
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
      roadtext=FPS;
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
      roadtext=FPS;
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
      roadtext=FPS;
      return false;
    }
  }
  return true;
}
function canbuildT(){
  for(var i=0;i<towers.length;i++){
    if(cursor.x-(cursor.x%32)==towers[i].x&&cursor.y-(cursor.y%32)==towers[i].y){
      towertext=FPS;
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
document.onmousewheel=function(event){
  if(event.wheelDelta>0){
    isbuilding=isbuilding+1;
    if(isbuilding>3){
      isbuilding=0;
    }
  }else{
    isbuilding=isbuilding-1;
    if(isbuilding<0){
      isbuilding=3;
    }
  }
};
document.oncontextmenu=function(event){
  pauseflag=!pauseflag;
  event.returnValue=false;
};
$("#gamecanvas").click(function(){
  if(cursor.x>640&&cursor.x<736&&cursor.y>64&&cursor.y<160&&isbuilding==0){
    pauseflag=!pauseflag;
  }
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
  if(cursor.x>704&&cursor.x<736&&cursor.y>0&&cursor.y<32){
    if(isbuilding!=3){
      isbuilding=3;
    }else{
      isbuilding=0;
    }
  }
  if(isbuilding==1&&cursor.x<640&&canbuild1()&&canbuild2()&&canbuild3()&&canbuild4()&&canbuildT()&&money>0){
    var newtower=new Tower1();
    towers.push(newtower);
    money=money-1;
  }else if(money<=0&&cursor.x<640){
    moneytext=FPS;
    towertext=0;
    roadtext=0;
  }
  if(isbuilding==2&&cursor.x<640&&canbuild1()&&canbuild2()&&canbuild3()&&canbuild4()&&canbuildT()&&money>0){
    var newtower=new Tower2();
    towers.push(newtower);
    money=money-1;
  }else if(money<=0&&cursor.x<640){
    moneytext=FPS;
    towertext=0;
    roadtext=0;
  }
  if(isbuilding==3&&cursor.x<640&&canbuild1()&&canbuild2()&&canbuild3()&&canbuild4()&&canbuildT()&&money>0){
    var newtower=new Tower3();
    towers.push(newtower);
    money=money-1;
  }else if(money<=0&&cursor.x<640){
    moneytext=FPS;
    towertext=0;
    roadtext=0;
  }
  for(var i=0;i<towers.length;i++){
    if(isbuilding==0&&money>0&&iscollided1(cursor.x,cursor.y,towers[i].x,towers[i].y,32,32)){
      towers[i].level=towers[i].level+1;
      money=money-1;
    }else if(iscollided1(cursor.x,cursor.y,towers[i].x,towers[i].y,32,32)&&money<=0){
      moneytext=FPS;
      towertext=0;
      roadtext=0;
    }
  }
});
function draw(){
  if(!autopauseflag&&!pauseflag){
    if(enemyclock%((((FPS*3)-((FPS*3)%4))/4)+enemyclockrandom)==0){
      enemyclock=0;
      enemyclockrandom=((Math.floor(Math.random()*121)*FPS)-((Math.floor(Math.random()*121)*FPS)%60))/60;
      var newenemy=new Enemy();
      enemies.push(newenemy);
      enemies[enemies.length-1].waypointschoice();
      enemycount=enemycount+1
      if(enemycount%4==0){
        enemylevel=enemylevel+1;
      }
    }
    //if(enemycount%4==0){
      //enemylevel=enemylevel+1;
      //enemycount=enemycount+1;
    //}
    clock=clock+1;
    enemyclock=enemyclock+1
  }
  ctx.drawImage(bgimg,0,0);
  for(var i=0;i<enemies.length;i++){
    if(!autopauseflag&&!pauseflag){
      enemies[i].move();
    }
    if(enemies[i].hp<=0){
      enemies.splice(i,1);
      money=money+1;
      if(money>9){
        money=9;
      }
    }else{
    ctx.drawImage(enemyimg,enemies[i].x,enemies[i].y);
    }
  }
  for(var i=0;i<towers.length;i++){
    towers[i].serchenemy();
    if(!autopauseflag&&!pauseflag){
      towers[i].nowreload=towers[i].nowreload-1;
    }
    if(towers[i].tower==1){
      ctx.drawImage(tower1img,towers[i].x,towers[i].y);
    }
    if(towers[i].tower==2){
      ctx.drawImage(tower2img,towers[i].x,towers[i].y);
    }
    if(towers[i].tower==3){
      ctx.drawImage(tower3img,towers[i].x,towers[i].y);
    }
    if(towers[i].aimingid!=null){
      if(towers[i].nowreload<=0){
        towers[i].shotting=FPS/6;
        towers[i].shottingx=enemies[towers[i].aimingid].x;
        towers[i].shottingy=enemies[towers[i].aimingid].y;
        enemies[towers[i].aimingid].hp=enemies[towers[i].aimingid].hp-(towers[i].attack*towers[i].level);
        if(enemies[towers[i].aimingid].hp<0){
          enemies[towers[i].aimingid].hp=0;
        }
        towers[i].nowreload=towers[i].reload;
      }
      if(towers[i].tower==1&&towers[i].shotting>0){
        ctx.beginPath();
        ctx.moveTo(towers[i].x+16,towers[i].y+16);
        ctx.lineTo(towers[i].shottingx+16,towers[i].shottingy+16);
        ctx.strokeStyle="rgb(255,0,0)";
        ctx.lineWidth="2";
        ctx.stroke();
        ctx.closePath();
        if(!autopauseflag&&!pauseflag){
          towers[i].shotting=towers[i].shotting-1;
        }
      }
      if(towers[i].tower==2&&towers[i].shotting>0){
        ctx.beginPath();
        ctx.moveTo(towers[i].x+16,towers[i].y+16);
        ctx.lineTo(towers[i].shottingx+16,towers[i].shottingy+16);
        ctx.strokeStyle="rgb(0,0,255)";
        ctx.lineWidth="2";
        ctx.stroke();
        ctx.closePath();
        if(!autopauseflag&&!pauseflag){
          towers[i].shotting=towers[i].shotting-1;
        }
      }
      if(towers[i].tower==3&&towers[i].shotting>0){
        ctx.beginPath();
        ctx.moveTo(towers[i].x+16,towers[i].y+16);
        ctx.lineTo(towers[i].shottingx+16,towers[i].shottingy+16);
        ctx.strokeStyle="rgb(255,102,255)";
        ctx.lineWidth="2";
        ctx.stroke();
        ctx.closePath();
        if(!autopauseflag&&!pauseflag){
          towers[i].shotting=towers[i].shotting-1;
        }
      }
    }
  }
  for(var i=0;i<enemies.length;i++){
    ctx.drawImage(enemyhpimg,(enemies[i].x+3),(enemies[i].y-5),((26/enemies[i].fullhp)*enemies[i].hp),3);
  }
  if(isbuilding==1){
    ctx.drawImage(range1img,cursor.x-(cursor.x%32)+16-initialrange1,cursor.y-(cursor.y%32)+16-initialrange1,initialrange1*2,initialrange1*2);
    ctx.drawImage(tower1img,cursor.x-(cursor.x%32),cursor.y-(cursor.y%32));
  }
  if(isbuilding==2){
    ctx.drawImage(range2img,cursor.x-(cursor.x%32)+16-initialrange2,cursor.y-(cursor.y%32)+16-initialrange2,initialrange2*2,initialrange2*2);
    ctx.drawImage(tower2img,cursor.x-(cursor.x%32),cursor.y-(cursor.y%32));
  }
  if(isbuilding==3){
    ctx.drawImage(range3img,cursor.x-(cursor.x%32)+16-initialrange3,cursor.y-(cursor.y%32)+16-initialrange3,initialrange3*2,initialrange3*2);
    ctx.drawImage(tower3img,cursor.x-(cursor.x%32),cursor.y-(cursor.y%32));
  }
  ctx.drawImage(boximg,640,0);
  ctx.drawImage(tower1btnimg,640,0);
  ctx.drawImage(tower2btnimg,672,0);
  ctx.drawImage(tower3btnimg,704,0);
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
  if(money==9){
    ctx.drawImage(pointimg,704,192);
    ctx.drawImage(pointimg,704,224);
    ctx.drawImage(pointimg,704,256);
    ctx.drawImage(pointimg,704,288);
    ctx.drawImage(pointimg,704,320);
    ctx.drawImage(pointimg,704,352);
    ctx.drawImage(pointimg,704,384);
    ctx.drawImage(pointimg,704,416);
    ctx.drawImage(pointimg,704,448);
  }else if(money==8){
    ctx.drawImage(pointimg,704,224);
    ctx.drawImage(pointimg,704,256);
    ctx.drawImage(pointimg,704,288);
    ctx.drawImage(pointimg,704,320);
    ctx.drawImage(pointimg,704,352);
    ctx.drawImage(pointimg,704,384);
    ctx.drawImage(pointimg,704,416);
    ctx.drawImage(pointimg,704,448);
  }else if(money==7){
    ctx.drawImage(pointimg,704,256);
    ctx.drawImage(pointimg,704,288);
    ctx.drawImage(pointimg,704,320);
    ctx.drawImage(pointimg,704,352);
    ctx.drawImage(pointimg,704,384);
    ctx.drawImage(pointimg,704,416);
    ctx.drawImage(pointimg,704,448);
  }else if(money==6){
    ctx.drawImage(pointimg,704,288);
    ctx.drawImage(pointimg,704,320);
    ctx.drawImage(pointimg,704,352);
    ctx.drawImage(pointimg,704,384);
    ctx.drawImage(pointimg,704,416);
    ctx.drawImage(pointimg,704,448);
  }else if(money==5){
    ctx.drawImage(pointimg,704,320);
    ctx.drawImage(pointimg,704,352);
    ctx.drawImage(pointimg,704,384);
    ctx.drawImage(pointimg,704,416);
    ctx.drawImage(pointimg,704,448);
  }else if(money==4){
    ctx.drawImage(pointimg,704,352);
    ctx.drawImage(pointimg,704,384);
    ctx.drawImage(pointimg,704,416);
    ctx.drawImage(pointimg,704,448);
  }else if(money==3){
    ctx.drawImage(pointimg,704,384);
    ctx.drawImage(pointimg,704,416);
    ctx.drawImage(pointimg,704,448);
  }else if(money==2){
    ctx.drawImage(pointimg,704,416);
    ctx.drawImage(pointimg,704,448);
  }else if(money==1){
    ctx.drawImage(pointimg,704,448);
  }
  if(autopauseflag||pauseflag){
    ctx.drawImage(playimg,640,64);
  }else{
    ctx.drawImage(pauseimg,640,64);
  }
  if(moneytext>0){
    ctx.fillText("No enough money !",5,25);
      moneytext=moneytext-1;
  }
  if(towertext>0){
    ctx.fillText("There's already a tower here !",5,25);
      towertext=towertext-1;
  }
  if(roadtext>0){
    ctx.fillText("Can't build on the road!",5,25);
      roadtext=roadtext-1;
  }
  autopauseflag=false;
  if(isbuilding!=0){
    autopauseflag=true;
  }
  for(var i=0;i<enemies.length;i++){
    if(iscollided1(cursor.x,cursor.y,enemies[i].x,enemies[i].y,32,32)&&!isbuilding){
      autopauseflag=true;
      ctx.fillText(enemies[i].level,enemies[i].x+10,enemies[i].y-5);
    }
  }
  for(var i=0;i<towers.length;i++){
    if(iscollided1(cursor.x,cursor.y,towers[i].x,towers[i].y,32,32)&&!isbuilding){
      autopauseflag=true;
      ctx.fillText(towers[i].level,towers[i].x+10,towers[i].y-5);
      if(towers[i].tower==1){
        if(towers[i].aimingid!=null){
          ctx.drawImage(crosshair1img,enemies[towers[i].aimingid].x-4,enemies[towers[i].aimingid].y-4,40,40);
        }
        ctx.drawImage(range1img,towers[i].x+16-towers[i].range,towers[i].y+16-towers[i].range,towers[i].range*2,towers[i].range*2);
      }
      if(towers[i].tower==2){
        if(towers[i].aimingid!=null){
          ctx.drawImage(crosshair2img,enemies[towers[i].aimingid].x-4,enemies[towers[i].aimingid].y-4,40,40);
        }
        ctx.drawImage(range2img,towers[i].x+16-towers[i].range,towers[i].y+16-towers[i].range,towers[i].range*2,towers[i].range*2);
      }
      if(towers[i].tower==3){
        if(towers[i].aimingid!=null){
          ctx.drawImage(crosshair3img,enemies[towers[i].aimingid].x-4,enemies[towers[i].aimingid].y-4,40,40);
        }
        ctx.drawImage(range3img,towers[i].x+16-towers[i].range,towers[i].y+16-towers[i].range,towers[i].range*2,towers[i].range*2);
      }
    }
  }
  tutorial();
  if(playerhp<=0){
    clearInterval(set);
    ctx.font="75px Arial";
    ctx.fillStyle="black";
    ctx.fillText("Game Over",150,278);
  }
}
var set=setInterval(draw,1000/FPS);
