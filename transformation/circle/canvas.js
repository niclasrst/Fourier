// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Utility Functions
function randomIntFromRange(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
function map(value, a, b, c, d) { return c + ((value - a) / (b - a)) * (d - c); }

// Objects
function point(x, y) {
  c.beginPath();
  c.arc(x, y, 1, 0, 2 * Math.PI, true);
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

function init() {
  for (let i = 0; i < 100; i++) {
    angle = map(i, 0, 100, 0, Math.PI * 2);
    x[i] = 100 * Math.cos(angle);
  }

  for (let i = 0; i < 100; i++) {
    angle = map(i, 0, 100, 0, Math.PI * 2);
    y[i] = 100 * Math.sin(angle);
  }

  fourierX = fourierTransform(x);
  fourierY = fourierTransform(y);

  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);
}

// Animation Loop
let time = 0;
let path = [];
let first = true;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  let vx = epiCycles(canvas.width / 2, 100, 0, fourierX);
  let vy = epiCycles(100, canvas.height / 2, Math.PI / 2, fourierY);
  let v = new Vector(vx.x, vy.y);
  path.unshift(v);

  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);

  if (!first) {
    for (let i = 0; i < path.length; i++) {
      point(path[i].x, path[i].y);
      //line(path[i].x, path[i].y, path[i+1].x, path[i+1].y);
    }
  }

  const dt = (Math.PI * 2) / fourierY.length;
  time -= dt;
  first = false;

  if (path.length > 75) { path.pop(); }
}

init();
animate();
