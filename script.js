let yoyo;
const aType = new Array();
let aNum;
let akumas;
let x;
let y;
let screen;
let score;
let font;
let isCounting;
let swarmFrame;
let pressedAkuma;

function preload(){
  yoyo = loadImage('pixelyoyo.png');
  swarm = loadImage('ladybugswarm.png');
  font = loadFont('https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap');

}

function setup() {
  createCanvas(600, 600);
  aNum = 5;
  screen = 0;
  score = 0;
  isCounting = false;
  swarmFrame = 0;

  akumas = new Group();
  akumas.collider = 'dynamic';
  akumas.overlaps(akumas);
  akumas.width = 60;
  akumas.height = 60;
  akumas.friction = 0;
  akumas.strokeWeight = 0;
  for(let i = 0; i < aNum; i++){
    akuma = new akumas.Sprite();
    akumas[i].direction = random(0,360);
    akumas[i].speed = random(4,7);
    akumas[i].rotationSpeed = random(-1,1);
    
  }
}

function draw() {
  if(screen==0){
    
    background('#9D0101');
    akumas.visible=false;
    
  }else if(screen==1){
    
    background('#dd0101');

    textAlign(CENTER);
    textSize(40);
    strokeWeight(2);
    textFont(font);
    fill('#141414');
    text("Captured: "+score, 300,500);
    
    strokeWeight(5);
    stroke('#9D0101');
    akumas.visible=true;

    line(0,600,x,y);
    line(600,600,x,y);
    imageMode(CENTER);
    image(yoyo,x,y,50,50);
    noFill();
    rectMode(CENTER);
    rect(x,y,80,80);
    line(x,y-50,x,y-30);
    line(x,y+30,x,y+50);
    line(x-50,y,x-30,y);
    line(x+30,y,x+50,y);

    for(let i = 0; i < aNum; i++){
      
      if(akumas[i].x>600||akumas[i].x<0||akumas[i].y>600||akumas[i].y<0){
        
        akumas[i].x = random(0,600);
        akumas[i].y = random(0,600);
        akumas[i].direction = random(0,360);
        akumas[i].speed = random(4,7);
        akumas[i].rotationSpeed = random(-1,1);
        
      }
      
      if(akumas[i].mouse.presses()){
        
        score++;
        isCounting = true;
        pressedAkuma = i;
        
      }


      if(isCounting&&swarmFrame<120){
        image(swarm, x, y,120,70);
        swarmFrame++;
        akumas[pressedAkuma].speed=0;
      }
      
      if(swarmFrame>=120&&isCounting){
        akumas[pressedAkuma].x = random(0,600);
        akumas[pressedAkuma].y = random(0,600);
        akumas[pressedAkuma].direction = random(0,360);
        akumas[pressedAkuma].speed = random(4,7);
        akumas[pressedAkuma].rotationSpeed = random(-1,1);
        swarmFrame=0;
        isCounting=false;
      }
      
    }
  }
}

function mousePressed(){
  if(screen==0){
    screen=1;
  }else if(screen==2){
    screen=0;
  }
  x = mouseX;
  y = mouseY;
}
