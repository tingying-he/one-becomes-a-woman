
var reset = true;

/* eyes */
var eyes = [];
var numEyes = 100;
let eyeImg;

let pg;//mouse trace

let changeTime=0;
let whisper;

// /* comments */
// var comment = 0;
// var streams = [];
// var fadeInterval = 1.6;
// var symbolSize = 14;
// var comments = [
//                 "Why do women let go of bodies. Find a gym or call Jenny Craig. Gress",
//                 "She has a prosthetic leg, and just flirting with everyone",
//                 "OMG, such a fat pig",
//                 "Why you're even building a career",
//                 "You get fat these days",
//                 "What did your husband think about this",
//                 "You dress is so short, you shouln't wear it"
//                 ];


function preload() {
    eyeImg = loadImage('images/eye.png');
    whisper = loadSound("sound/whisper.mp3");
}

// Setup
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    colorMode(RGB,255,255,255,1);
    // background(0);

    // comments
    // var y = 0;
    // for (var i = 0; i <= height / symbolSize; i++) {
    //     var stream = new Stream();
    //     // stream.generateSymbols(random(-2000, 0), y);
    //     stream.generateSymbols(random(0, 2000), y);
    //     streams.push(stream);
    //     y += symbolSize
    // }

    // whisper.play();
    whisper.loop();
    whisper.setVolume(0.5);
     
    // Create Eyes
     for (i = 0; i < numEyes; i++) {    
        var x = random(width);
        var y = random(height);      
        eyes[i] = new Eye(x, y);
       }
   
       pg = createGraphics(window.innerWidth, window.innerHeight); //to be fixed
}

//Particle
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


// function Symbol(x, y, speed, first, opacity) {
//     this.x = x;
//     this.y = y;
//     // this.value;

//     this.speed = speed;
//     this.first = first;
//     this.opacity = opacity;

//     this.setToRandomSymbol = function(){
//         // var a = round(random(0,comments.length-1))
//         this.value = comments[comment%comments.length]
//         comment = comment + 1;
//         // console.log(a);
//     }

//     this.rain = function () {
//         this.x = (this.x >= width) ? 0 : this.x += this.speed;
//     }

// }

// function Stream() {
//     this.symbols = [];
//     this.speed = random(1,3); 

//     this.generateSymbols = function (x, y) {
//         var opacity = 255;
//         var first = round(random(0, 4)) == 1;
//         symbol = new Symbol(
//             x,
//             y,
//             this.speed,
//             first,
//             opacity
//         );
//         symbol.setToRandomSymbol();
//         this.symbols.push(symbol);

//     }

//     this.render = function () {
        
//         this.symbols.forEach(function (symbol) {
//             if (symbol.first) {
//                 fill(134, 128, 128, symbol.opacity);  // 134, 128, 128,
//             } else {
//                 fill(92, 79, 79, symbol.opacity);  // 92, 79, 79,
//             }
//             text(symbol.value, symbol.x, symbol.y);
//             symbol.rain();
//             // symbol.setToRandomSymbol();
//         });
//     }
// }



// Update Canvas
function draw() {
    
    clear();

    pg.stroke(47, 46, 46,80); // fix the stroke style
    pg.strokeWeight(6);
    pg.line(mouseX, mouseY, pmouseX, pmouseY);
    image(pg, 0, 0);


    var target = createVector(mouseX, mouseY);
    for (i = 0; i < numEyes; i++) { //
        eyes[i].seek(target);
        eyes[i].display();
        eyes[i].update();
    }

    // streams.forEach(function (stream) {
    //     stream.render();
    // });

}

