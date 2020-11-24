let img;
let pg;
let eye;
let angle = 0;

function preload() {
  img = loadImage("images/Venus.jpg");
}

function setup() {
  createCanvas(1000, 853);
  pg = createGraphics(640, 853);
  eye = createGraphics(640, 853);
}
    
function draw() {
  // background(130);
  image(img, 0, 0, 640, 853);
  // pg.fill(255, 0, 0);
  // noStroke();
  // pg.line(mouseX, mouseY, pmouseX, pmouseY);
  // image(pg, 0, 0);

  if (mouseIsPressed === true) {
    angle += 5;
    let val = cos(radians(angle)) * 12.0;
    for (let a = 0; a < 360; a += 75) {
      let xoff = cos(radians(a)) * val;
      let yoff = sin(radians(a)) * val;
      fill(153, 51, 0);
      eye.ellipse(mouseX + xoff, mouseY + yoff, val, val);
    }
    fill(204, 102, 0);
    eye.ellipse(mouseX, mouseY, 2, 2);
  }
  image(eye, 0, 0);
}
