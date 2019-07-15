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

// Implementation
let y = [];
let fourierY = [];

function init() {
  c.translate(300, canvas.height / 2);

  for (let i = 0; i < 100; i++) {
    y[i] = i;
  }

  fourierY = fourierTransform(y);
}

// Animation Loop
let time = 0;
let wave = [];
let first = true;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);

  let x = 0, y = 0;

  for (let i = 0; i < fourierY.length; i++) {
    let prevx = x;
    let prevy = y;

    let freq = fourierY[i].freq;
    let radius = fourierY[i].amp;
    let phase = fourierY[i].phase;

    // s_hat * cos(omega * t + phi) -> Elongation-Zeit
    x += radius * Math.cos(freq * time + phase + Math.PI / 2);
    y += radius * Math.sin(freq * time + phase + Math.PI / 2);

    circle(prevx, prevy, radius, false);
    line(prevx, prevy, x, y);
  }
  wave.unshift(y);

  line(x, y, 200, wave[0]);
  if (!first) {
    for (let i = 0; i < wave.length; i++) {
      point(i + 200, wave[i]);
      line(i + 200, wave[i], i + 200 + 1, wave[i + 1]);
    }
  }

  const dt = (Math.PI * 2) / fourierY.length;
  time += dt;
  first = false;

  if (wave.length > 900) { wave.pop(); }
}

init();
animate();
