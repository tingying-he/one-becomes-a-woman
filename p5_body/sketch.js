
var reset = true;
let gif;


function preload() {
    gif = loadImage("../images/female.gif");
}

// Setup
function setup() {
    cnv = createCanvas(100, 200);
    colorMode(RGB,255,255,255,1);
    // background(0);


    cnv.mousePressed(playGif);
     
}
function playGif(){
    gif.play();
}


// Update Canvas
function draw() {
    
    clear();
    image(gif,10,10);

}

