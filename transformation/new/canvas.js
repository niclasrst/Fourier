// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener('mousedown', () => {
  state = USER;
  drawing = [];
  x = [];
  y = [];
  time = 0;
  path = [];
});

addEventListener('mouseup', () => {
  state = FOURIER;

  const step = 1;
  for (let i = 0; i < drawing.length; i += step) {
    x.push(drawing[i].x);
    y.push(drawing[i].y);
  }

  fourierX = fourierTransform(x);
  fourierY = fourierTransform(y);

  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);
});

// Utility Functions
function randomIntFromRange(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
function map(value, a, b, c, d) { return c + ((value - a) / (b - a)) * (d - c); }

// Objects
function point(x, y) {
  c.beginPath();
  c.arc(x, y, 5, 0, 2 * Math.PI, true);
  c.fill();
  c.closePath();
}

function line(x1, y1, x2, y2) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
  c.closePath();
}

function circle(x, y, radius) {
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.strokeStyle = '#000';
  c.stroke();
  c.closePath();
}

function epiCycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;

    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    // s_hat * cos(omega * t + phi) -> Elongation-Zeit
    x += radius * Math.cos(freq * time + phase + rotation);
    y += radius * Math.sin(freq * time + phase + rotation);

    circle(prevx, prevy, radius);
    line(prevx, prevy, x, y);
  }

  return new Vector(x, y);
}

// Implementation
let x = [], y = [];
let fourierX = [], fourierY = [];

function init() { state = -1; }

// Animation Loop
const USER = 0;
const FOURIER = 1;

let time = 0;
let path = [];
let drawing = [];
let state = -1;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  if (state == USER) {
    let point = new Vector(mouse.x - canvas.width / 2, mouse.y - canvas.height / 2);
    drawing.push(point);

    for (let v of drawing) {
      point(v.x + canvas.width / 2, v.y + canvas.height / 2);
    }

  } else if (state == FOURIER) {
    let vx = epiCycles(canvas.width / 2, 100, 0, fourierX);
    let vy = epiCycles(100, canvas.height / 2, Math.PI / 2, fourierY);
    let v = new Vector(vx.x, vy.y);
    path.unshift(v);

    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);

    for (let i = 0; i < path.length; i++) {
      point(path[i].x, path[i].y);
    }

    const dt = (Math.PI * 2) / fourierY.length;
    time += dt;

    if (time > (Math.PI * 2)) { time = 0; path = []; }
  }

}

init();
animate();
