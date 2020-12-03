// Global Vars
var reset = true;
var a = 0;
let changeTime = 0;

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

    // textFont('Consolas');
    // textSize(symbolSize);
}


function Symbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    // this.value;

    this.speed = speed;
    this.first = first;
    this.opacity = opacity;

    // this.switchInterval = round(random(2, 25));

    // this.setToRandomSymbol = function () {
    //     var charType = round(random(0, 5));
    //     if (frameCount % this.switchInterval == 0) {
    //         if (charType > 1) {
    //             // set it to Katakana
    //             this.value = String.fromCharCode(
    //                 0x30A0 + floor(random(0, 97))
    //             );
    //         } else {
    //             // set it to numeric
    //             this.value = floor(random(0, 10));
    //         }
    //     }
    // }

    this.setToRandomSymbol = function(){
        // var a = round(random(0,comments.length-1))
        this.value = comments[a%6]
        a = a + 1;
        // console.log(a);
    }

    this.rain = function () {
        this.x = (this.x >= width) ? 0 : this.x += this.speed;
    }

}

function Stream() {
    this.symbols = [];
    // this.totalSymbols = round(random(20, 50));
    // this.totalSymbols = 0;
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
        // opacity -= (255 / this.totalSymbols) / fadeInterval;
        // x -= symbolSize;
        // first = false;
        // for (var i = 0; i <= this.totalSymbols; i++) {
        //     symbol = new Symbol(
        //         x,
        //         y,
        //         this.speed,
        //         first,
        //         opacity
        //     );
        //     symbol.setToRandomSymbol();
        //     this.symbols.push(symbol);
        //     opacity -= (255 / this.totalSymbols) / fadeInterval;
        //     x -= symbolSize;
        //     first = false;
        // }

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

    background(0, 150);

    streams.forEach(function (stream) {
        stream.render();
    });

}


