// Global Vars
var reset = true;
var eyes = [];
var numEyes = 100;
let eyeImg;
let femaleImg;
var female;
let pg;//mouse trace

let changeTime=0;



function preload() {
    eyeImg = loadImage('images/eye.png');
    femaleImg1 = loadImage('images/female1.png');
    femaleImg2 = loadImage('images/female2.png');
    femaleImg3 = loadImage('images/female3.png');
    femaleImg4 = loadImage('images/female4.png');

}

// Setup
function setup() {
    createCanvas(1200, 800);
    colorMode(RGB,255,255,255,1);
  
    // Set Background
    //background(0, 0, 0);

    // Create Eyes
    for (i = 0; i < numEyes; i++) {    
     var x = random(width);
     var y = random(height);      
     eyes[i] = new Eye(x, y);
    }

    female = new Female(femaleImg1);

    pg = createGraphics(1000, 1000);
}

// Particle
function Eye(x, y) {
  this.x = x;
  this.y = y;

    // Properties
    this.size = random(5,15);
    this.maxSpeed = random(5, 10);
    this.maxForce = random(0.01,4);
    this.mass = this.size; //this.size * this.size * PI;
  
    // Motion
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    var initV = 30;
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
        
        push();
      
        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);
        image(eyeImg,this.size,this.size,100,100);
        pop();
    }

   // Handle Edges
    this.edges = function() {
        if (this.pos.y > height) {
            this.pos.y = 0 - this.size;
        } else if (this.pos.y < 0) {
            this.pos.y = height + this.size;
        }
        if (this.pos.x > width + this.size) {
            this.pos.x = 0 - this.size;
        } else if (this.pos.x < 0 - this.size) {
            this.pos.x = width + this.size;
        }
    }
}
//draw body
function Female(img){ 
    this.display = function(img){
        console.log(img);
        image(img, 500, 0, 290, 792);
        console.log("Female is called");
    }
   
}

// Update Canvas
function draw() {
    clear();

    background(0, 0, 0);
    console.log(femaleImg1);
    female.display(femaleImg1);

    let currentTime = millis();
    console.log(currentTime);

    if (currentTime > 7000 && currentTime <14000) {
        female.display(
            femaleImg2
        );
    } else if (currentTime > 14000 && currentTime <21000){
        female.display(
            femaleImg3
        );
    }else if (currentTime > 21000){
        female.display(
            femaleImg4
        );
    }

    pg.stroke(255, 0, 184,50);
    pg.strokeWeight(6);
    pg.line(mouseX, mouseY, pmouseX, pmouseY);
    image(pg, 0, 0);


    var target = createVector(mouseX, mouseY);
    for (i = 0; i < numEyes; i++) {
        eyes[i].seek(target);
        eyes[i].display();
        eyes[i].update();
    }
  
}


