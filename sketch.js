// create variable
var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground;
var FoodGroup, obstacleGroup;
var score;
var Survival_Time;

// create function preload
function preload(){
  
  // load all animations
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png", "sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}


// create function setup
function setup() {
  
// create canvas of 600/600
  createCanvas(600,600);
  
// create sprite of monkey
  monkey = createSprite(100,400,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  
// write score = 0
  score = 0;
  
// write Survival Time
  Survival_Time = 0;
  
// make Group to new Group
  foodGroup = new Group();
  obstacleGroup = new Group();
}

// create function draw
function draw() {
  
// make background lightblue
  background("lightblue");
  
// create score
  fill("black");
  textSize(20);
  text("score: " + score,480,80);
 
// create Survival Time
  fill("black");
  textSize(20);
  text("Survival Time: " + Survival_Time,410,50);
  
// make gameState PLAY
if(gameState === PLAY){
   
// create Survival Time
  Survival_Time = Math.ceil(frameCount/frameRate())
  
  
// make sprite of ground
  ground = createSprite(600,480,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
// function to jump
  if(keyDown("space") && monkey.y >= 400){
     monkey.velocityY = -18;
  }
// make monkey velocity and collidebal
    monkey.velocityY = monkey.velocityY + 0.6;
    monkey.collide(ground);
  
// function to banana
  if(frameCount%80==0){
  banana = createSprite(600,200,20,20);
  banana.addImage("food +points", bananaImage);
  banana.y = Math.round(random(150,300));
  banana.scale = 0.1;
  banana.velocityX = -8;
  banana.lifetime = 80;
    
  foodGroup.add(banana);
    
  }
  
// function to obstacle
  if(frameCount%300==0){
  obstacle = createSprite(600,435,20,20);
  obstacle.addImage("obstacle -points", obstacleImage);
  obstacle.scale = 0.25;
  obstacle.velocityX = -5;
  obstacle.lifetime = 140;
    
  obstacleGroup.add(obstacle);
   }
  
// function to gain point
  if(foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
     score = score +1;
  }
  
// function to gameover
  if(obstacleGroup.isTouching(monkey)){
     obstacleGroup.destroyEach();
     gameState = END;
    }
   }
  
// gameState to END
  if(gameState === END){
    
     foodGroup.setvelocityXEach = (0);
     obstacleGroup.setvelocityXEach = (0);
     foodGroup.destroyEach();
     obstacleGroup.destroyEach();
     monkey.destroy();
     ground.destroy();
     
// text to  score
     textSize(50);
     text("GameOver",200,300);
  }
  
// draw sprite to show sprite
  drawSprites();
}
