let yoyo;
let aNum;
let akumas;
let x;
let y;
let screen;
let score;
let glitchFont;
let isCounting;
let swarmFrame;
let pressedAkuma;
let amok;
let whiteAmok;
let swordSlashSound;
let featherSound;
let featherFont;


function preload(){
  yoyo = loadImage('pixelyoyo.png');
  swarm = loadImage('ladybugswarm.png');
  amok = loadImage('amok.png');
  whiteAmok = loadImage('whiteamok.png');
  glitchFont = loadFont('https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap');
  featherFont = loadFont('featherfont.ttf');
  swordSlashSound = loadSound('swordslashquiet.MP3');
  featherSound = loadSound('featherflutter.MP3');
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
  akumas.layer = 1;
  akumas.image = amok;
  akumas.scale = 2.5;
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
    aNum = 5;
    screen = 0;
    score = 0;
    isCounting = false;
    swarmFrame = 0;

    textFont(featherFont);
    textAlign(CENTER);
    textSize(70);
    strokeWeight(5);
    stroke('#dd0101');
    fill(0);
    text("Birds of a Feather",300,150);
    textSize(40);
    text('A Miraculous Ladybug Fangame',300,250);
    textFont(glitchFont);
    textSize(25);
    noStroke();
    text('Click on the feathers with the ladybug \nyoyo to capture',300,400);
    text('Capture 20 to win',300,475);
    text('Click anywhere to play',300,520);
    
  }else if(screen==1){
    
    background('#dd0101');
    akumas.visible = true;

    textAlign(CENTER);
    textSize(60);
    strokeWeight(5);
    textFont(featherFont);
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
        
        isCounting = true;
        score++;
        pressedAkuma = i;
        featherSound.play();
      }


      if(isCounting&&swarmFrame<120){
        swarmFrame++;
        akumas[pressedAkuma].image = whiteAmok;
        akumas[pressedAkuma].speed=0;
        image(swarm, akumas[pressedAkuma].x, akumas[pressedAkuma].y,120,70);
        
      }
      
      if(swarmFrame>=120&&isCounting){
        akumas[pressedAkuma].image = amok;
        akumas[pressedAkuma].x = random(0,600);
        akumas[pressedAkuma].y = random(0,600);
        akumas[pressedAkuma].direction = random(0,360);
        akumas[pressedAkuma].speed = random(4,7);
        akumas[pressedAkuma].rotationSpeed = random(-1,1);
        swarmFrame=0;
        isCounting=false;
        
      }
      
    }

    if(score>=20){
      screen=2;
    }
    
  }else if(screen==2){

    background('#9D0101');
    akumas.visible = false;
    
    textFont(featherFont);
    textAlign(CENTER);
    textSize(70);
    strokeWeight(5);
    stroke('#dd0101');
    fill(0);
    text('You Win',300,150);
    textSize(40);
    text('Click anywhere to play again',300,270);
  }
}

function mousePressed(){
  if(screen==0){
    screen=1;
  }else if (screen==1){
    swordSlashSound.play();
    
  }else if(screen==2){
    setup();
  }
  x = mouseX;
  y = mouseY;
}
