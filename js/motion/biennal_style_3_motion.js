let font;
// const txt = "2026";
let txt = "Més enllà de la pantalla";
const purple = '#a475fa';
const brown = '#6f3116';
const grey = '#9b9b9b';

function preload() {
  font = loadFont('assets/NEXTPanBook-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(100);
  const textInput = document.getElementById('text-input');
  textInput.addEventListener('input', () => {
    txt = textInput.value;
  });
  // noLoop();
}

// function keyPressed() {

//     if (key === 's' || key === 'S') {
//         save('biennal-darts-digitals.svg');
//     }

// }

function draw() {
  background(255);
  noStroke();
  rectMode(CENTER);

  const fontSize = 100;
  const textX = width / 2 - textWidth(txt) / 2;
  const y = height / 2;
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

  const duration = 1000;
  const delay = 500;
  const elapsed = (millis() % (duration + delay)) - delay;
  const t = constrain(elapsed / duration, 0, 1);
  // const easedT = t * t * (3 - 2 * t);
  const easedT = 1 - (1 - t) * (1 - t);

  const start1 = 0;
  const end1 = 20;
  const siez1 = lerp(start1, end1, easedT);

  fill(grey);

  for (const groups of letterGroups) {
    for (const p of groups.third) {
      push();
      translate(p.x, p.y);
      rotate();
      rect(0, 0, siez1);
      pop();
    }
  }

  const start2 = 0;
  const end2 = 25;
  const siez2 = lerp(start2, end2, easedT);

  fill(purple);

  for (const groups of letterGroups) {
    for (const p of groups.second) {
      push();
      translate(p.x, p.y);
      rotate(QUARTER_PI);
      rect(0, 0, siez2);
      pop();
    }
  }

  fill(brown);

  const start3 = 0;
  const end3 = 12.5;
  const siez3 = lerp(start3, end3, easedT);

  for (const groups of letterGroups) {
    for (const p of groups.first) {
      push();
      translate(p.x, p.y);
      rotate(QUARTER_PI);
      rect(0, 0, siez3);
      pop();
    }
  }

  fill(255)
  text(txt, textX, height/2);
  
}