// Global Vars
var reset = true;
var comment = 0;

var streams = [];
var fadeInterval = 1.6;
var symbolSize = 30;
var comments = [
  "Why do women let go of bodies. Find a gym or call Jenny Craig. Gross",
  "OMG, such a fat pig",
  "She has a prosthetic leg, and just flirting with everyone",
  "You get fat these days",
  "You dress is so short, you shouldn't wear it",
  "Why you're even building a career",
  "What did your husband think about this",
];
var loopLength = (comments[0].length * 25 + 30) * (comments.length - 1);

// Setup
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  var y = 0;
  for (var i = 0; i <= height / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(random(-2000, 2000), y);
    streams.push(stream);
    y += symbolSize;
  }

  textFont("Courier Prime");
  textStyle(BOLD);
  textSize(25);
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.setToRandomSymbol = function () {
    // var a = round(random(0,comments.length-1))
    this.value = comments[comment % comments.length];
    comment = comment + 1;
    // console.log(a);
  };

  this.rain = function () {
    this.x = this.x >= width ? -loopLength : (this.x += this.speed);
  };
}

function Stream() {
  this.symbols = [];
  this.speed = random(1, 4);

  this.generateSymbols = function (x, y) {
    var opacity = 50;
    var first = round(random(0, 10)) == 1; //4
    for (var i = 0; i < comments.length - 1; i++) {
      symbol = new Symbol(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      x -= comments[0].length * 25 + 30;
    }
  };

  this.render = function () {
    this.symbols.forEach(function (symbol) {
      if (symbol.first) {
        fill(134, 50, 50, symbol.opacity); // 134, 128, 128,
      } else {
        fill(92, 79, 79, symbol.opacity); // 92, 79, 79,
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      // symbol.setToRandomSymbol();
    });
  };
}

// Update Canvas
function draw() {
  background(254, 242, 220, 400); //223,222,212,

  streams.forEach(function (stream) {
    stream.render();
  });
}
