// Global Vars
var reset = true;
var eyes = [];
var numEyes = 5000;
let eyeImg;
let femaleImg;
var female;
let pg;//mouse trace

let changeTime = 0;

<<<<<<< Updated upstream
=======
// let video;

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
>>>>>>> Stashed changes


function preload() {
    eyeImg = loadImage('images/eye.png');
    femaleImg0 = loadImage('images/female0.png');
    femaleImg1 = loadImage('images/female2.png');
}

// Setup
function setup() {
    createCanvas(1200, 800);
    // colorMode(RGB, 255, 255, 255, 1);

    // Set Background
    //background(0, 0, 0);

    // Create Eyes
    for (i = 0; i < numEyes; i++) {
        var x = random(width);
        var y = random(height);
        eyes[i] = new Eye(x, y);
<<<<<<< Updated upstream
    }

    female = new Female(femaleImg0);

    pg = createGraphics(1000, 1000);
=======
       }
   
       female = new Female(femaleImg1);

       //hover to control video
    //    video = createVideo('video/female.mp4');

    //    video.mouseOver(playVideo);
    //    video.mouseOut(pauseVideo);
   
       pg = createGraphics(1000, 1000);
>>>>>>> Stashed changes
}

// Particle
function Eye(x, y) {
    this.x = x;
    this.y = y;

    // Properties
    this.size = random(20, 50);
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
        image(eyeImg, this.size, this.size, this.size, this.size);
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

// Update Canvas
function draw() {
    clear();

    background(0, 0, 0);
<<<<<<< Updated upstream
    console.log(femaleImg0);
    female.display(femaleImg0);
=======

    // image(vid, 10, 10);

    female.display(femaleImg1);
>>>>>>> Stashed changes

    let currentTime = millis();
    console.log(currentTime);
    // let timeInterval = currentTime-changeTime;
    if (currentTime > 5000) {//&& currentTime <10000
        female.display(
            femaleImg1
        );
        // changeTime = currentTime;
    }

    // console.log(female.display());

    pg.stroke(255, 255, 0)
    pg.line(mouseX, mouseY, pmouseX, pmouseY);
    image(pg, 0, 0);


    var target = createVector(mouseX, mouseY);
    for (i = 0; i < currentTime / 100 * 3; i++) {
        eyes[i].seek(target);
        eyes[i].display();
        eyes[i].update();
    }

<<<<<<< Updated upstream
}


=======
    streams.forEach(function (stream) {
        stream.render();
    });

}

// function playVideo(){
//     video.play();
//     console.log("videoplay is called");
// }


// function pauseVideo(){
//     video.pause();
//     console.log("videopause is called");
// }

>>>>>>> Stashed changes
