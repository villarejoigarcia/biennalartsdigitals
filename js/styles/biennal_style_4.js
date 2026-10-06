let font;
let txt = "Més enllà de la pantalla";
// let txt = "Scroll";
const purple = '#a475fa';
const brown = '#6f3116';
const grey = '#9b9b9b';

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
    const storageKey = 'biennal_svg_downloads_style_3';
    const previousCount = Number(localStorage.getItem(storageKey) || 0);
    const downloadCount = previousCount + 1;
    localStorage.setItem(storageKey, downloadCount);
    save(`biennal_style_4_${String(downloadCount).padStart(3, '0')}.svg`);
  });
  noLoop();
}

// function keyPressed() {

//     if (key === 's' || key === 'S') {
//         save('biennal-darts-digitals.svg');
//     }

// }

function draw() {
  textAlign(LEFT)
  background('#f5f5f5');
  noStroke();
  rectMode(CENTER);

  const fontSize = 100;
  const x = width / 2;
  const y = height / 2;

  const textX = x - textWidth(txt) / 2;

  const letterGroups = [];
  let prefix = '';

  for (const character of txt) {
    const points = font.textToPoints(character, textX + textWidth(prefix), y, fontSize, {
      sampleFactor: .34,
      simplifyThreshold: 0,
    });
    const firstSplit = Math.ceil(points.length / 3);
    const secondSplit = Math.ceil(points.length * 2 / 3);
    letterGroups.push({
      first: points.slice(0, firstSplit),
      second: points.slice(firstSplit, secondSplit),
      third: points.slice(secondSplit),
    });
    prefix += character;
  }

  fill(brown);

  for (const groups of letterGroups) {
    for (const p of [...groups.first, ...groups.second, ...groups.third]) {
      push();
      translate(p.x, p.y);
      rotate(0);
      rect(0, 0, 40);
      pop();
    }
  }

  fill(purple);

  for (const groups of letterGroups) {
    for (const p of groups.third) {
      push();
      translate(p.x, p.y);
      rotate(QUARTER_PI);
      rect(0, 0, 20);
      pop();
    }
  }

  fill(255);

  for (const groups of letterGroups) {
    for (const p of groups.second) {
      push();
      translate(p.x, p.y);
      rotate(QUARTER_PI);
      rect(0, 0, 15);
      pop();
    }
  }

  fill(255)

  text(txt, textX, height/2);
  
}