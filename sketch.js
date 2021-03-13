var p1,p2,meteorite1,meteorite2,meteorite3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,meteoriteGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;

function preload() {
  spaceImage = loadImage("space.png");
  spaceShipImage = loadImage("spaceship.png");
  laserImage = loadImage("laser.png");
  meteorite1 = loadImage("as1.png");
  meteorite2 = loadImage("as2.png");
  meteorite3 = loadImage("as3.png");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
}

function setup() {  
  canvas = createCanvas(1000,700);
  space = createSprite(250,350,30,20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);

  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;
  
  p1 = createSprite(250,600);
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  p2.visible = false;
  
  meteoriteGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    if(space.y > 800) {
      space.y = 300;
    }
    shoot = shoot - 1;

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(meteoriteGroup.isTouching(p2) || meteoriteGroup.isTouching(p1)) {
      meteoriteGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
      gameState = end;
    }
    
    if(meteoriteGroup.isTouching(laserGroup)) {
      meteoriteGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 5;
    }

    meteorites();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("Score : " + score,210,60)
    
    if(meteoriteGroup.isTouching(endline)) {
      meteoriteGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
    stroke("white");
    fill("Red");
    textSize(40);
    text("GAME OVER!",100,200);
    text("The meteorites destroyed the planet",100,300);
    text("YOUR TOTAL SCORE : " +score,100,400);
  }

  if(gameState === instruction) {
    stroke("white");
    fill("white");
    textFont("trebuchetMS")
    textSize(50);
    text("------SPACE FIGHTERS------",250,50);
    stroke("white");
    fill("Blue");
    textSize(39);
    textFont("Apple Chancery");
    text("Some meteorites are coming towards the Earth!",200,100);
    text("You are a space fighter.",200,200);
    text("Save the planet!",200,300);
    text("Press the 'spacebar' to shoot.",200,400);
    text("Use the right and left arrows to move.",200,500);
    text("Press 'S' to start the game.",200,600);
    
    if(keyDown("s")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
}

function meteorites() {
  if(frameCount % 110 === 0) {
    var meteorite = createSprite(Math.round(random(50,1350)),-20);
    meteorite.velocityY = (6 + score/10);
    meteorite.lifetime = 200;
    meteorite.scale = random(0.4,0.5);

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: meteorite.addImage(meteorite1);
              meteorite.setCollider("circle",-80,10,160);
              break;
      case 2: meteorite.addImage(meteorite2);
              meteorite.setCollider("circle",50,0,150);
              break;
      case 3: meteorite.addImage(meteorite3);
              meteorite.setCollider("circle",0,0,170)
      default: break;
    }
    meteoriteGroup.add(meteorite);
  }
}