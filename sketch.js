var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg,ghostImg1;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var gameovers;
var fonts;
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spook.mp3");
  gameovers = loadSound("gameover.wav")
  fonts=loadFont("hi.ttf");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
}

function draw() {
  background(200);
  if(gameState==="play"){


  if(tower.y > 400){
      tower.y = 300;
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x -= 3;
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x += 3;
    }
    if(keyDown("SPACE")){
      ghost.velocityY = -5;
    }
ghost.velocityY += 0.8;

if(climbersGroup.isTouching(ghost)){
  ghost.velocityY = 0;
}

if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
  ghost.destroy();
  spookySound.stop();
  gameovers.play();
  gameState = "end";
}
    spawndoors();
    drawSprites();
}
if(gameState==="end"){
  background(0);
  textSize(150);
  fill(166,16,30);
  textFont(fonts)
  text("gameover",60,250);
}
}
function spawndoors(){
  if(frameCount % 240 ===0){
    var door = createSprite(200,-50)
    door.addImage(doorImg);
var climber = createSprite(200,10);
climber.addImage(climberImg);

var invisibleBlock = createSprite(200,15);
invisibleBlock.width = climber.width;
invisibleBlock.height = 2;

climber.velocityY=1;
    door.x = Math.round(random(120,400));
    climber.x=door.x;
    door.velocityY=1;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    //invisibleBlock.debug = true;
    door.lifetime = 800;
    climber.lifetime=800;
    ghost.depth = door.depth;
    ghost.depth += 1;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}