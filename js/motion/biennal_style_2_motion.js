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
}

// function keyPressed() {

//     if (key === 's' || key === 'S') {
//         save('biennal-darts-digitals.svg');
//     }

// }

function draw() {
  background('#f5f5f5');
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
    const halfSplit = Math.ceil(points.length / 2);
    letterGroups.push({
      first: points.slice(0, firstSplit),
      second: points.slice(firstSplit, secondSplit),
      third: points.slice(secondSplit),
      firstHalf: points.slice(0, halfSplit),
      secondHalf: points.slice(halfSplit),
    });
    prefix += character;
  }

  const duration = 1000;
  const delay = 500;
  // const elapsed = max(0, millis() - delay);
  const elapsed = (millis() % (duration + delay)) - delay;
  const t = constrain(elapsed / duration, 0, 1);
  const easedT = 1 - (1 - t) * (1 - t);

  // const t2 = constrain((millis() - (delay + duration)) / duration, 0, 1);

  fill(brown);

  const start1 = 60;
  const end1 = 0;
  const siez1 = lerp(start1, end1, easedT);

  for (const groups of letterGroups) {
    for (const p of groups.secondHalf) {
    push();
    translate(p.x, p.y);
    rotate();
    rect(0, 0, siez1);
    pop();
    }
  }
  
  // fill(grey);

  // for (const groups of letterGroups) {
  //   for (const p of groups.third) {
  //     push();
  //     translate(p.x, p.y);
  //     rotate();
  //     rect(0, 0, 0);
  //     pop();
  //   }
  // }

  const start2a = 60;
  const end2a = 50;
  const start2b = 60;
  const end2b = 50 / 3;
  const siez2a = lerp(start2a, end2a, easedT);
  const siez2b = lerp(start2b, end2b, easedT);

  for (const groups of letterGroups) {
    for (const p of groups.firstHalf) {
      push();
      translate(p.x, p.y);
      rotate(0);
      rect(0, 0, siez2a, siez2b);
      pop();
    }
  }

  fill(purple);

  const startRot = QUARTER_PI;
  const endRot = 0;
  const rot = lerp(startRot, endRot, easedT);

  const startPurp1 = 40;
  const endPurp1 = 25;
  const startPurp2 = 40;
  const endPurp2 = 25/3;
  const sizePurp1 = lerp(startPurp1, endPurp1, easedT);
  const sizePurp2 = lerp(startPurp2, endPurp2, easedT);

  for (const groups of letterGroups) {
    for (const p of groups.secondHalf) {
      push();
      translate(p.x, p.y);
      rotate(rot);
      rect(0, 0, sizePurp1, sizePurp2);
      pop();
    }
  }

  const startPurp = 40;
  const endPurp = 0;
  const sizePurp = lerp(startPurp, endPurp, easedT);

  for (const groups of letterGroups) {
    for (const p of groups.firstHalf) {
      push();
      translate(p.x, p.y);
      rotate(QUARTER_PI);
      rect(0, 0, sizePurp);
      pop();
    }
  }

  //

  fill(255)
  text(txt, textX, height/2);
}

/*
 
anotations

*/