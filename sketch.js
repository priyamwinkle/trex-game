var trex,trex_running,ground,groundimage,invisibleground,cloudImage,cloudsGroup,count;
var ob1,ob2,ob3,ob4,ob5,ob6,obGroup,PLAY,END,gamestate,trex_collided;
var gameOver,restart,restartimg,gameOverimg;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  trex_collided=loadAnimation("trex_collided.png");
  gameOverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
}

function setup() {
  createCanvas(600,200);
  
  trex = createSprite(50,150,20,20);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("dead",trex_collided);
  trex.scale=0.5;
  
  ground=createSprite(300,180,600,10);
  ground.addImage(groundimage);

  ground.x=ground.width/2;
  
  invisibleground=createSprite(300,190,600,5);
  invisibleground.visible=false;
  
  cloudsGroup=new Group();
  obGroup=new Group();
  
  count=0;
  PLAY=1
  END=0
  gamestate=PLAY
  
  trex.setCollider("circle",0,0,45);
  
  gameOver=createSprite(300,75,20,20);
  gameOver.addImage(gameOverimg);
  gameOver.visible=false;
  
  restart=createSprite(300,140,20,20);
  restart.addImage(restartimg);
  restart.scale=0.75;
  restart.visible=false;
} 

function draw() {
    background(180);
       trex.collide(invisibleground);
    textSize(15)
  text("score="+count,510,50)

  if (gamestate===PLAY){
      if (ground.x<0){
         ground.x=ground.width/2;
       }
      if (keyDown("space")&& trex.y>=164){
         trex.velocityY=-10;
       }
      trex.velocityY=trex.velocityY+0.8;
      ground.velocityX=-6;
     count=count+Math.round(getFrameRate()/60);
      spawnClouds();
      spawnObstacle();
      if (trex.isTouching(obGroup)){
        gamestate=END;
      }
    }
  if(gamestate===END){
     ground.velocityX=0;
     obGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     trex.velocityY=0;
     cloudsGroup.setLifetimeEach(-1);
     obGroup.setLifetimeEach(-1);
     trex.changeAnimation("dead",trex_collided);
     gameOver.visible=true;
     restart.visible=true;
    
  }
  if (mousePressedOver(restart)){
      reset();
    }
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -5;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacle(){
  if (frameCount % 80===0){
    var obstacle=createSprite(600,170,20,20)
    obstacle.velocityX=-6
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(ob1);
      break;
      case 2:obstacle.addImage(ob2);
      break;
      case 3:obstacle.addImage(ob3);
      break;
      case 4:obstacle.addImage(ob4);
      break;
      case 5:obstacle.addImage(ob5);
      break;
      case 6:obstacle.addImage(ob6);
      break;
      default:break;
    }
    obGroup.add(obstacle);
    obstacle.lifetime=200;
    obstacle.scale=0.50;
  } 
}
function reset(){
  gamestate=PLAY;
  obGroup.destroyEach();
  cloudsGroup.destroyEach();
  count=0;
  gameOver.visible=false;
  restart.visible=false;
}

