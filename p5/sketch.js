// Global Vars
var reset = true;
var eyes = [];
var numEyes = 100;
let eyeImg;
let femaleImg;
var female;
let trace;//mouse trace

let changeTime = 0;

var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;



function preload() {
    eyeImg = loadImage('images/eye.png');
    femaleImg0 = loadImage('images/female0.png');
    femaleImg1 = loadImage('images/female2.png');
}

// Setup
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // colorMode(RGB, 255, 255, 255, 1);

    // Set Background
    //background(0, 0, 0);

    // Create Eyes
    for (i = 0; i < numEyes; i++) {
        var x = random(width);
        var y = random(height);
        eyes[i] = new Eye(x, y);
    }

    female = new Female(femaleImg0);

    trace = createGraphics(width, height);

    background(0);

    var y = 0;
    for (var i = 0; i <= height / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(random(-2000, 0), y);
        streams.push(stream);
        y += symbolSize
    }

    textFont('Consolas');
    textSize(symbolSize);
}

// Particle
function Eye(x, y) {
    this.x = x;
    this.y = y;

    // Properties
    this.size = random(5, 15);
    this.maxSpeed = random(5, 10);
    this.maxForce = random(0.01, 4);
    this.mass = this.size; //this.size * this.size * PI;

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
    }

    // Behaviors
    this.seek = function (target) {
        var desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        var steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxForce);
        this.applyForce(steering);
    }

    // Handle Updates
    this.update = function () {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }



    // Draw
    this.display = function () {

        push();

        translate(this.pos.x, this.pos.y);
        imageMode(CENTER);
        image(eyeImg, this.size, this.size, 100, 100);
        pop();
    }

    // Handle Edges
    this.edges = function () {
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
function Female(img) {
    this.display = function (img) {
        console.log(img);
        image(img, 500, 0, 290, 792);
        console.log("Female is called");
    }

}



function Symbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    this.value;

    this.speed = speed;
    this.first = first;
    this.opacity = opacity;

    this.switchInterval = round(random(2, 25));

    this.setToRandomSymbol = function () {
        var charType = round(random(0, 5));
        if (frameCount % this.switchInterval == 0) {
            if (charType > 1) {
                // set it to Katakana
                this.value = String.fromCharCode(
                    0x30A0 + floor(random(0, 97))
                );
            } else {
                // set it to numeric
                this.value = floor(random(0, 10));
            }
        }
    }

    this.rain = function () {
        this.x = (this.x >= width) ? 0 : this.x += this.speed;
    }

}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(20, 50));
    this.speed = random(2, 15); 

    this.generateSymbols = function (x, y) {
        var opacity = 255;
        var first = round(random(0, 4)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(
                x,
                y,
                this.speed,
                first,
                opacity
            );
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            opacity -= (255 / this.totalSymbols) / fadeInterval;
            x -= symbolSize;
            first = false;
        }
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
            symbol.setToRandomSymbol();
        });
    }
}



// Update Canvas
function draw() {
    // clear();

    // background(0, 0, 0);
    background(0, 150);

    streams.forEach(function (stream) {
        stream.render();
    });


    console.log(femaleImg0);
    female.display(femaleImg0);

    // let currentTime = millis();
    // console.log(currentTime);
    // let timeInterval = currentTime-changeTime;
    // if (currentTime > 5000) {//&& currentTime <10000
    //     female.display(
    //         femaleImg1
    //     );
    //     // changeTime = currentTime;
    // }

    // console.log(female.display());



    trace.stroke(0)
    trace.line(mouseX, mouseY, pmouseX, pmouseY);
    image(trace, 0, 0);


    var target = createVector(mouseX, mouseY);
    for (i = 0; i < numEyes; i++) {
        eyes[i].seek(target);
        eyes[i].display();
        eyes[i].update();
    }

}


