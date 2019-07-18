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

// Utillities
function randomColor(colors) { return colors[Math.floor(Math.random() * colors.length)]; }

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
function init() { c.translate(300, canvas.height / 2); }

// Animation Loop
let time = 0;
let wave = [];
let first = true;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);

  let x = 0, y = 0;

  for (let i = 0; i < 5; i++) {
    let prevx = x;
    let prevy = y;

    let n = i * 2 + 1;
    let radius = 100 * (4 / (n * Math.PI));

    x += radius * Math.cos(n * time);
    y += radius * Math.sin(n * time);

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

  if (wave.length > 900) { wave.pop(); }
  time -= 0.02;
  first = false;
}

init();
animate();
