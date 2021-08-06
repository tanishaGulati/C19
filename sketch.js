var rocket, rocket_img;
var asteroid, asteroid_img;
var meteor, meteor_img;
var star, star_img;
var space, space_img;
var fuel,fuel_img;


var PLAY = 1;
var END = 0;
 
var gameState = PLAY;

var fuel = 50;
var score = 0;


function preload(){
  rocket_img = loadImage("rocket.png");
  asteroid_img = loadImage("asteroid1.png");
  meteor_img = loadImage("meteor.png");
  star_img = loadImage("star.png");
  space_img = loadImage("space.png");
  fuel_img = loadImage("fuel.png");
  
}

function setup() {
 createCanvas(800,800);
  
  space = createSprite(400,200);
  space.addImage("backdrop",space_img);
  space.velocityY = 2;
  
  rocket = createSprite(200,500,50,50);
  rocket.addImage("spaceShip", rocket_img);
  rocket.scale = 0.18;
  
  meteorsGroup = new Group();
  asteroidsGroup = new Group();
  starsGroup = new Group();
  fuelsGroup = new Group();
  
}

function draw() {
 // background("black");
  
  stroke("white");
  fill("white");
  textSize(30);
  text("Score: "+ score, 660,40);
  
   stroke("white");
   fill("white");
   textSize(30);
   text("Fuel: "+ fuel , 680,100);
  
     if (gameState === PLAY){
   
  if(space.y>500){
    space.y=400;
  }
  
  
  if (keyDown("right")){
    rocket.x = rocket.x+6;
  }
  
  if (keyDown("left")){
    rocket.x = rocket.x-6;
  }
  
  if (keyDown("space")){
    rocket.velocityY= -10;
  }
       
  if (meteorsGroup.isTouching(rocket)) {
      meteorsGroup.destroyEach();
      gameState = END;     
      }
       
  if (asteroidsGroup.isTouching(rocket)) {
      asteroidsGroup.destroyEach();
      score = score -2 ;     
      }    
       
  if (starsGroup.isTouching(rocket)) {
      starsGroup.destroyEach();
      score = score + 5;     
      }
       
  if (fuelsGroup.isTouching(rocket)) {
      fuelsGroup.destroyEach();
      fuel = fuel + 3;     
  }
       
  if (World.frameCount % 120 == 0) {
   fuel = fuel - 3;
  }
       
  if (fuel === 0){
  stroke("RED");
  fill("RED");
  textSize(30);
  text("NO FUEL, NO FUEL !!", 20,230);
  }     
       
  if (fuel < -15){
    gameState = END;
  }
  
  rocket.velocityY = rocket.velocityY + 0.2;
       
  
     
  spawnMeteors();
  spawnAsteroids();
  spawnStars();
  spawnFuel();
       
       if(rocket.x>800 || rocket.x<0 || rocket.y>800 || rocket.y<0){
            
  gameState = END;
       }
     
  drawSprites () ;   
  }
  
     else {
    
  stroke("yellow");
  fill("BLUE");
  textSize(30);  
  text("YOU LOST!!!", 260,40);
       
  space.velocityY = 0;
  
  rocket.visible = false;
       
  meteorsGroup.setVelocityYEach(0);
  asteroidsGroup.setVelocityYEach(0);
  starsGroup.setVelocityYEach(0);
  fuelsGroup.setVelocityYEach(0);
       
       
  meteorsGroup.setLifetimeEach(-1);
  asteroidsGroup.setLifetimeEach(-1);
  starsGroup.setLifetimeEach(-1);
  fuelsGroup.setLifetimeEach(-1);

  
}
}

function spawnMeteors() {
  if (World.frameCount % 400 == 0) {
  var meteor = createSprite(Math.round(random(50,760),40, 10, 10));
  meteor.addImage(meteor_img);
  meteor.scale=0.12;
  meteor.velocityY = 3;
  meteor.lifetime = 300;
  meteorsGroup.add(meteor);
  }
}

function spawnAsteroids() {
  if (World.frameCount % 300 == 0) {
  var asteroid = createSprite(Math.round(random(50,760),40, 10, 10));
  asteroid.addImage(asteroid_img);
  asteroid.scale=0.3;
  asteroid.velocityY = 3;
  asteroid.lifetime = 300;
  asteroidsGroup.add(asteroid);
  }
}

function spawnStars() {
  if (World.frameCount % 100 == 0) {
  var star = createSprite(Math.round(random(50,760),40, 10, 10));
  star.addImage(star_img);
  star.scale=0.04;
  star.velocityY = 3;
  star.lifetime = 300;
  starsGroup.add(star);
  }
}

function spawnFuel() {
  if (World.frameCount % 100 == 0) {
  var fuel = createSprite(Math.round(random(50,760),40, 10, 10));
  fuel.addImage(fuel_img);
  fuel.scale=0.1;
  fuel.velocityY = 3;
  fuel.lifetime = 300;
  fuelsGroup.add(fuel);
  }
}