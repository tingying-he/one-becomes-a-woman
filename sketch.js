let img;
let pg;
let eye;
let angle = 0;

var fr = 60;
var stage;
var hue;
var bgHue;
var reset = true;
var vehicles = [];
var numVehicles = 200;

function preload() {
  img = loadImage("images/Venus.jpg");
}

function setup() {
  createCanvas(640, 853);
  
  // Set Background
  colorMode(HSB);
  hue = random(0, 360);
  bgHue = hue;
  bgHue = createVector(correctRotation(bgHue), 100, 15);

  // Create Vehicles & Attractors
  for (i = 0; i < numVehicles; i++) {
      var x = random(width);
      var y = random(height);
      vehicles[i] = new Vehicle(x, y);
  }

  pg = createGraphics(640, 853);
  eye = createGraphics(640, 853);

  frameRate(fr);
}

function createVehicle(x, y) {
  vehicles[numVehicles] = new Vehicle(x, y);
  numVehicles += 1;
}

/**
 * @Availability https://wow.techbrood.com/fiddle/33714
 */
// Particle
function Vehicle(x, y, m) {

  // Properties
  this.size = random(5, 15);
  this.maxSpeed = random(1, 3);
  this.maxForce = random(.04, 4);
  // this.maxSpeed = random(100,150)/this.size;
  // this.maxForce = random(10,200)/this.size;
  this.mass = this.size; //this.size * this.size * PI;
  this.Hsl = hue + random(-10, 10);
  this.Hsl = correctRotation(this.Hsl);
  this.hSl = random(70, 100);
  this.hsL = random(40, 100);
  // Motion
  this.pos = createVector(x, y);
  this.acc = createVector(0, 0);
  var initV = 10;
  this.vel = createVector(random(-initV, initV), random(-initV, initV));

  // External Forces
  this.applyForce = function(force) {
      var f = force.copy();
      f.div(this.mass);
      this.acc.add(f);
  }

  // Behaviors
  this.seek = function(target) {
      var desired = p5.Vector.sub(target, this.pos);
      desired.setMag(this.maxSpeed);

      var steering = p5.Vector.sub(desired, this.vel);
      steering.limit(this.maxForce);
      this.applyForce(steering);
  }

  // Handle Updates
  this.update = function() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
  }

  // Draw
  this.display = function() {
      colorMode(HSB);
      // fill(this.Hsl, this.hSl, this.hsL);
      // noStroke();
      // Draw Triangle and rotate it in the direction it is moving
      var theta = this.vel.heading() + PI / 2;
      fill(this.Hsl, this.hSl, this.hsL);
      noStroke();
      // fill(this.Hsl, this.hSl, this.hsL - 20);
      // stroke(this.Hsl, this.hSl, this.hsL);
      // strokeWeight(1);
      push();
      translate(this.pos.x, this.pos.y);
      rotate(theta);
      beginShape();
      vertex(0, -this.size);
      vertex(-this.size / 2, this.size);
      vertex(this.size / 2, this.size);
      endShape(CLOSE);
      pop();
  }
}

// MOUSE EVENTS
function mousePressed() {
  // Explode Existing Vehicles
  for (var j = 0; j < vehicles.length; j++) {
      var explode = 10;
      vehicles[j].vel.add(random(-explode, explode), random(-explode, explode));
  }
  // Create New Vehicles
  var numAdd = random(5, 10);
  for (var i = 0; i < numAdd; i++) {
    createVehicle(mouseX, mouseY);
  }

}

// Correct Rotation
function correctRotation(deg) {
  /*
    Corrects a rotation and if it:
    exceed 360 degrees or is less than 0
  */
  if (deg > 360) {
      deg -= 360;
  } else if (deg < 0) {
      deg += 360;
  }
  return (deg);
}
    
function draw() {
  clear();
  background(img);
  // image(img, 0, 0, 640, 853);
  pg.fill(255, 0, 0);
  noStroke();
  pg.line(mouseX, mouseY, pmouseX, pmouseY);
  image(pg, 0, 0);

  if (mouseIsPressed === true) {
    angle += 5;
    let val = cos(radians(angle)) * 12.0;
    for (let a = 0; a < 360; a += 75) {
      let xoff = cos(radians(a)) * val;
      let yoff = sin(radians(a)) * val;
      fill(153, 51, 0);
      eye.ellipse(mouseX + xoff, mouseY + yoff, val, val);
    }
    fill(204, 102, 0);
    eye.ellipse(mouseX, mouseY, 2, 2);
  }
  image(eye, 0, 0);

  var target = createVector(mouseX, mouseY);
    for (i = 0; i < numVehicles; i++) {
        vehicles[i].seek(target);
        vehicles[i].display();
        vehicles[i].update();
    }
}
