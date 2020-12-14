var reset = true;

/* eyes */
var eyes = [];
var numEyes = 100;
let eyeImg;

let trace; //mouse trace

let changeTime = 0;
let whisper;
let gif;
let frame;
let frame1;
let triger = false;

var sequenceAnimation;


function preload() {
  eyeImg = loadImage("./images/eye2.gif");
  whisper = loadSound("./sound/whisper.mp3");
  gif = loadImage("./images/female.gif");
  frame = loadImage("./images/frame0.png");
  frame1 = loadImage("./images/frame1.png");

  sequenceAnimation = loadAnimation("./images/frame0.png", "./images/frame1.png");

}

// Setup
function setup() {
  frameRate(15);
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(RGB, 255, 255, 255, 1);

  whisper.play();
  whisper.setVolume(0.005);

  // Create Eyes
  for (i = 0; i < numEyes; i++) {
    var x = random(width);
    var y = random(height);
    eyes[i] = new Eye(x, y);
  }

  trace = createGraphics(window.innerWidth, window.innerHeight); //to be fixed
}

//Particle
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
  if (mouseX > 600 && mouseX < 1200 && mouseY > 50 && mouseY < 1250) {
    triger = true;
    // gif.play();
    sequenceAnimation.play();
  } else {
    // gif.pause();
    sequenceAnimation.stop();
  }
}

// Update Canvas
function draw() {
  clear();

  // try {
  //   if (triger) {
  //     image(gif, 600, 50, 600, 1200);
  //   } else {
  //     image(frame1, 600, 50, 600, 1200);
  //   }
  //   gifControl();
  // } catch(e) {
  //   console.log(e);
  //   image(frame, 600, 50, 600, 1200);
  // }

  // image(gif, 600, 50, 600, 1200);
  // this.gifControl();

  animation(sequenceAnimation, 100, 100);
  sequenceAnimation.looping = false;
  gifControl();
  
  image(trace, 0, 0);
  trace.stroke(47, 46, 46, 80); // fix the stroke style
  trace.strokeWeight(6);
  trace.line(mouseX, mouseY, pmouseX, pmouseY);

  var target = createVector(mouseX, mouseY);
  for (i = 0; i < numEyes; i++) {
    eyes[i].seek(target);
    eyes[i].display();
    eyes[i].update();
  }
}

function mousePressed() {
  whisper.setVolume(1, 50, 0);
  setTimeout(() => {
    whisper.setVolume(0.005, 10, 0);
    // console.log("voice down");
  }, 1000);
}
