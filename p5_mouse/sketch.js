var reset = true;

/* eyes */
var eyes = [];
var numEyes = 100;
let eyeImg;
let instructionImg;

let trace; //mouse trace

let changeTime = 0;
let whisper;
let quote;

var sequenceAnimation;

let w1;
let w2;


function preload() {
  eyeImg = loadImage("https://media.giphy.com/media/0LU6KkazoNmzu2Gve5/giphy.gif");//https://media.giphy.com/media/jrTbLp6QQqYAz4LG6V/giphy.gif
  instructionImg = loadImage("https://raw.githubusercontent.com/tingying-he/creative-design/master/p5/images/Instruction2_black2.png");
  whisper = loadSound("./sound/whisper.mp3");

  sequenceAnimation = loadAnimation("./images/frames/1.png", "./images/frames/36.png");

  quote = loadSound("./sound/quote.mp3");
}

// Setup
function setup() {
  frameRate(15);
 
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(RGB, 255, 255, 255, 1);
  //
//   whisper.play();
  whisper.loop();
  whisper.setVolume(0.02);
  quote.loop();
  quote.setVolume(0.5);

  // Create Eyes
  for (i = 0; i < numEyes; i++) {
    var x = random(width);
    var y = random(height);
    eyes[i] = new Eye(x, y);
  }

  trace = createGraphics(window.innerWidth, window.innerHeight); //to be fixed

  w1 = window.innerWidth / 2 - (window.innerHeight-100) * 730 / 1712 / 2;
  w2 = window.innerWidth / 2 + (window.innerHeight-100) * 730 / 1712 / 2;
}

// Particle
// @avalibility: https://wow.techbrood.com/fiddle/33714
function Eye(x, y) {
  this.x = x;
  this.y = y;

  // Properties
  this.size = random(5, 15);
  this.maxSpeed = random(10, 15);
  this.maxForce = random(0.01, 4);
  this.mass = this.size; //this.size * this.size * PI;
  this.width = random(40, 60);

  // Motion
  this.pos = createVector(x, y);
  this.acc = createVector(0, 0);
  var initV = 30;
  this.vel = createVector(random(-initV, initV), random(-initV, initV));

  // External Forces
  this.applyForce = function (force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  };

  // Behaviors
  this.seek = function (target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    this.applyForce(steering);
  };

  // Handle Updates
  this.update = function () {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  };

  // Draw
  this.display = function () {
    push();
    translate(this.pos.x, this.pos.y);
    imageMode(CENTER);
    image(eyeImg, this.size, this.size, this.width, this.width);
    pop();
  };
}

function gifControl() {
  
  if (mouseX > w1 && mouseX < w2 && mouseY > 50 && mouseY < window.innerHeight) {
    sequenceAnimation.play();
  } else {
    sequenceAnimation.stop();
  }
}

// Update Canvas
function draw() {
  clear();


  // animation(sequenceAnimation, window.innerWidth / 2, window.innerHeight / 2-30, (window.innerHeight-100) * 730 / 1712, window.innerHeight-100); // 3595
  animation(sequenceAnimation, window.innerWidth / 2, window.innerHeight / 2-30, (window.innerHeight-100)* 730 / 1712, window.innerHeight-100); 
  sequenceAnimation.looping = false;
  sequenceAnimation.frameDelay = 6;
  gifControl();
  
  image(trace, 0, 0);
  trace.stroke(255, 39, 143, 80); // fix the stroke style 47, 46, 46, 80, ----173, 113, 239----233, 190, 221
  trace.strokeWeight(12);
  trace.line(mouseX, mouseY, mouseX, mouseY);
  console.log(mouseX);
  imageMode(CENTER);
  image(instructionImg,window.innerWidth / 2,window.innerHeight / 2-30+(window.innerHeight-100)/2,794,80);
  
  var target = createVector(mouseX, mouseY);
  for (i = 0; i < numEyes; i++) {
    eyes[i].seek(target);
    eyes[i].display();
    eyes[i].update();
  }
}

function mousePressed() {
  whisper.setVolume(0.3, 2, 0);
  setTimeout(() => {
    whisper.setVolume(0.02, 2, 0);//0.005,10,0
    // console.log("voice down");
  }, 1000); //1000
}

