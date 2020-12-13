var reset = true;

/* eyes */
var eyes = [];
var numEyes = 100;
let eyeImg;

let trace; //mouse trace

let changeTime = 0;
let whisper;
let gif;

function preload() {
  eyeImg = loadImage("./images/eye2.gif");
  whisper = loadSound("./sound/whisper.mp3");
  gif = loadImage("./images/female.gif");
}

// Setup
function setup() {
  frameRate(15);
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(RGB, 255, 255, 255, 1);

  //
  whisper.play();
  whisper.setVolume(0.005);
  gif.pause();

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

  // Handle Edges
  // this.edges = function () {
  //   if (this.pos.y > height) {
  //     this.pos.y = 0 - this.size;
  //   } else if (this.pos.y < 0) {
  //     this.pos.y = height + this.size;
  //   }
  //   if (this.pos.x > width + this.size) {
  //     this.pos.x = 0 - this.size;
  //   } else if (this.pos.x < 0 - this.size) {
  //     this.pos.x = width + this.size;
  //   }
  // };
}

function gifControl() {
  if (mouseX > 600 && mouseX < 1200 && mouseY > 50 && mouseY < 1250) {
    gif.play();
  } else {
    gif.pause();
  }
}

// Update Canvas
function draw() {
  clear();

  trace.stroke(47, 46, 46, 80); // fix the stroke style
  trace.strokeWeight(6);
  trace.line(mouseX, mouseY, pmouseX, pmouseY);
  image(trace, 0, 0);
  image(gif, 600, 50, 600, 1200);
  this.gifControl();

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
