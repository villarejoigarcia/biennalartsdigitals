let font;
// const txt = "Biennal d'Arts Digitals";
let txt = "Més enllà de la pantalla";
const purple = '#a475fa';
const brown = '#6f3116';

function preload() {
  font = loadFont('assets/NEXTPanBook-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  textFont(font);
  textSize(100);
  const textInput = document.getElementById('text-input');
  textInput.addEventListener('input', () => {
    txt = textInput.value;
    redraw();
  });
  document.getElementById('download-svg').addEventListener('click', () => {
    const storageKey = 'biennal_svg_downloads_style_1';
    const previousCount = Number(localStorage.getItem(storageKey) || 0);
    const downloadCount = previousCount + 1;
    localStorage.setItem(storageKey, downloadCount);
    save(`biennal_style_1_${String(downloadCount).padStart(3, '0')}.svg`);
  });
  noLoop();
}

function draw() {
  textAlign(CENTER)
  background('#f5f5f5');
  noStroke();
  rectMode(CENTER);

  const fontSize = 100;
  const x = width / 2;
  const y = height / 2;

  const points = font.textToPoints(txt, x, y, fontSize, {
    sampleFactor: .34,
    simplifyThreshold: 0,
  });

  // stroke 1

  fill(brown);

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    rect(p.x, p.y, 60);
  }
  
  // stroke 1

  fill(purple);

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    push();
    translate(p.x, p.y);
    rotate(QUARTER_PI);
    rect(0, 0, 40);
    pop();
  }

  //

  fill(255)
  text(txt, x, height/2);
}
