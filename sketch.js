var PLAY = 1;
var END = 0;
var gameState = 1;


var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkey1 = loadImage("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("Still", monkey1);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  console.log(ground.x);

  score = 0;
  survivalTime = 0;

  bananaGroup = createGroup();
  rockGroup = createGroup();
}


function draw() {
  background("white");
  monkey.velocityY = monkey.velocityY + 0.8;
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: " + score, 150, 75);

  if (gameState == PLAY) {

    if (keyDown("space")) {
      monkey.velocityY = -12;
    }

    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();

      score = score + 1;
    }
    if (rockGroup.isTouching(monkey)) {
      reset();
      gameState = END;
    }


  } else if (gameState == END) {
    monkey.changeAnimation("Still", monkey1);
    
       rockGroup.setVelocityEach(0);
  bananaGroup.setVelocityEach(0);
    
    survivalTime = survivalTime - survivalTime;

  }

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("survivalTime: " + survivalTime, 125, 50);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  obstacle();
  monkey.collide(ground);
  food();


  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, Math.round(random(0, 200)), 30, 30);

    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;

    banana.lifetime = 150;

    bananaGroup.add(banana);
  }
}

function obstacle() {
  if (frameCount % 300 === 0) {
    var rocks = createSprite(400, 320, 40, 70);
    rocks.addImage("obstacle1", obstaceImage);
    rocks.scale = 0.2
    rocks.velocityX = -7;

    rocks.lifetime = 150;

    rockGroup.add(rocks);
  }
}
function reset() {
  gameState = PLAY;
  rockGroup.destroyEach();
  bananaGroup.destroyEach();
 
  
  survivalTime = 0;
  score = 0;
}