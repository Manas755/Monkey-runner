var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey , monkey_running , ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var scoreColour    = "white";
var survivalTime = 0;
var survivalColour = "yellow";
var gameSpeed = 7 ;
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  monkey = createSprite(100,255,20,20);
  monkey.addAnimation("monkey running",monkey_running);
  monkey.scale =0.1;

  ground = createSprite(300,295,590,5);
  ground.velocityX = (gameSpeed);
  
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
}


function draw() {
  background(16.1,167.1,152.9);
  //displaying score(number of bananas)
  stroke(scoreColour);
  textSize(20);
  fill(scoreColour);
  text("Score: "+ score, 500,20);
  
  //survival time
  stroke(survivalColour);
  textSize(20);
  fill(survivalColour);
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival time:"+survivalTime,30,20)
  if(ground.x>width/2){
    ground.x = 300;
  }
  
  if(keyDown("space")&& monkey.y >= 255 ) {
    monkey.velocityY = -35;
  }
    
  //add gravity
  monkey.velocityY = monkey.velocityY + 2.8
  monkey.collide(ground);
  
  spawnBananas();
  spawnObstacles();
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score+1;
  }  
  
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
  }
     
  drawSprites();
}



function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,125,40,10);
    banana.y = Math.round(random(50,200));
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -(gameSpeed);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = banana.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount %300 === 0 ){
    obstacle = createSprite(600,269.5,20,20);
    obstacle.addImage("ObstacleImage",obstacleImage);
    obstacle.velocityX = -(gameSpeed);
    obstacle.scale = 0.15;
    obstacle.lifetime = 160;
    //obstacle.debug = true;
    obstacle.setCollider("circle",-15,20,250);
    obstacleGroup.add(obstacle);
  }
}