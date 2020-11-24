/**
 * @Availability https://wow.techbrood.com/fiddle/33714
 */

// Global Vars
var fr = 60;
var stage;
var hue;
var bgHue;
var reset = true;
var vehicles = [];
var numVehicles = 50;


// Setup
function setup() {
    // Create Stage
    // stage = createVector(document.body.offsetWidth, document.body.offsetHeight);
    // createCanvas(stage.x, stage.y);
    createCanvas(1530, 750);
    frameRate(fr);

    // Set Background
    colorMode(HSB);
    hue = random(0, 360);
    bgHue = hue;
    bgHue = createVector(correctRotation(bgHue), 100, 15);
    background(bgHue.x, bgHue.y, bgHue.z);

    // Create Vehicles & Attractors
    for (i = 0; i < numVehicles; i++) {
        var x = random(width);
        var y = random(height);
        vehicles[i] = new Vehicle(x, y);
    }
}

function createVehicle(x, y) {
    vehicles[numVehicles] = new Vehicle(x, y);
    numVehicles += 1;
}

// MOUSE EVENTS
function mousePressed() {
    // Explode Existing Vehicles
    for (var j = 0; j < vehicles.length; j++) {
        var explode = 10;
        vehicles[j].vel.add(random(-explode, explode), random(-explode, explode));
    }
    // Create New Vehicles
    // var numAdd = random(5, 10);
    // for (var i = 0; i < numAdd; i++) {
    //   createVehicle(mouseX, mouseY);
    // }

}



// Particle
function Vehicle(x, y, m) {

    // Properties
    this.size = random(5, 15);
    this.maxSpeed = random(5, 10);
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

    // Handle Edges
    // this.edges = function() {
    //     if (this.pos.y > height) {
    //         this.pos.y = 0 - this.size;
    //     } else if (this.pos.y < 0) {
    //         this.pos.y = height + this.size;
    //     }
    //     if (this.pos.x > width + this.size) {
    //         this.pos.x = 0 - this.size;
    //     } else if (this.pos.x < 0 - this.size) {
    //         this.pos.x = width + this.size;
    //     }
    // }
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

// Update Canvas
function draw() {
    clear();
    background(bgHue.x, bgHue.y, bgHue.z);

    var target = createVector(mouseX, mouseY);
    for (i = 0; i < numVehicles; i++) {
        vehicles[i].seek(target);
        // vehicles[i].edges();
        vehicles[i].display();
        vehicles[i].update();
    }
}