
var reset = true;

/* eyes */
var eyes = [];
var numEyes = 100;
let eyeImg;

let femaleVideo

let femaleImg;
var female;
let pg;//mouse trace

let changeTime=0;

/* comments */
var comment = 0;
var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;
var comments = [
                "1He gives his harness bells a shake",
                "2To ask if there is some mistake.",
                "3The only other sound’s the sweep",
                "4Of easy wind and downy flake.",
                "5The woods are lovely, dark, and deep,",
                "6But I have promises to keep,",
                "7And miles to go before I sleep,"
                ];


function preload() {
    eyeImg = loadImage('images/eye.png');
    femaleImg1 = loadImage('images/female1.png');
    femaleImg2 = loadImage('images/female2.png');
    femaleImg3 = loadImage('images/female3.png');
    femaleImg4 = loadImage('images/female4.png');

}

// Setup
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    colorMode(RGB,255,255,255,1);
    // background(0);

    var y = 0;
    for (var i = 0; i <= height / symbolSize; i++) {
        var stream = new Stream();
        // stream.generateSymbols(random(-2000, 0), y);
        stream.generateSymbols(random(0, 2000), y);
        streams.push(stream);
        y += symbolSize
    }

    // textFont('Consolas');
    // textSize(symbolSize);
     
    // Create Eyes
     for (i = 0; i < numEyes; i++) {    
        var x = random(width);
        var y = random(height);      
        eyes[i] = new Eye(x, y);
       }
   
       female = new Female(femaleImg1);
   
       pg = createGraphics(1000, 1000);
}

Particle
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
        image(eyeImg,this.size,this.size,50,50);
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
    }
   
}

function Symbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    // this.value;

    this.speed = speed;
    this.first = first;
    this.opacity = opacity;

    this.setToRandomSymbol = function(){
        // var a = round(random(0,comments.length-1))
        this.value = comments[comment%comments.length]
        comment = comment + 1;
        // console.log(a);
    }

    this.rain = function () {
        this.x = (this.x >= width) ? 0 : this.x += this.speed;
    }

}

function Stream() {
    this.symbols = [];
    this.speed = random(1,3); 

    this.generateSymbols = function (x, y) {
        var opacity = 255;
        var first = round(random(0, 4)) == 1;
        symbol = new Symbol(
            x,
            y,
            this.speed,
            first,
            opacity
        );
        symbol.setToRandomSymbol();
        this.symbols.push(symbol);

    }

    this.render = function () {
        
        this.symbols.forEach(function (symbol) {
            if (symbol.first) {
                fill(134, 128, 128, symbol.opacity);  // 134, 128, 128,
            } else {
                fill(92, 79, 79, symbol.opacity);  // 92, 79, 79,
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            // symbol.setToRandomSymbol();
        });
    }
}



// Update Canvas
function draw() {

    // background(0, 150);
    
    clear();

    background(0, 0, 0);
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
    for (i = 0; i < numEyes; i++) { //
        eyes[i].seek(target);
        eyes[i].display();
        eyes[i].update();
    }

    streams.forEach(function (stream) {
        stream.render();
    });

}


