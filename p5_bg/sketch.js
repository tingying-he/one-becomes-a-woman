// Global Vars
var reset = true;
var comment = 0;

var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;
var comments = [
                "Why do women let go of bodies. Find a gym or call Jenny Craig. Gress",
                "She has a prosthetic leg, and just flirting with everyone",
                "OMG, such a fat pig",
                "Why you're even building a career",
                "You get fat these days",
                "What did your husband think about this",
                "You dress is so short, you shouln't wear it"
                ];


// Setup
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    background(0);

    var y = 0;
    for (var i = 0; i <= height / symbolSize; i++) {
        var stream = new Stream();
        // stream.generateSymbols(random(-2000, 0), y);
        stream.generateSymbols(random(0, 2000), y);
        streams.push(stream);
        y += symbolSize
    }

    textFont('Montserret');
    textStyle(BOLD);
    textSize(25);
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
    this.speed = random(1,2); 

    this.generateSymbols = function (x, y) {
        var opacity = 50;
        var first = round(random(0, 10)) == 1;//4
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
                fill(134, 50, 50, symbol.opacity);  // 134, 128, 128,
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

    background(254,242,220,400);//223,222,212, 

    streams.forEach(function (stream) {
        stream.render();
    });

}


