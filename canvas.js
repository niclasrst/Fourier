// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = { x: innerWidth / 2, y: innerHeight / 2 }

const colors = [
  '#2185C5',
  '#7ECEFD',
  '#FFF6E5',
  '#FF7F66'
];

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

// Utility Functions
function randomIntFromRange(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
function randomColor(colors) { return colors[Math.floor(Math.random() * colors.length)]; }
function distance(x1, y1, x2, y2) { return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)); }

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

function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.update = () => {
    this.draw();
  }

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }
}

function Indicator(x, y) {
  this.x = x;
  this.y = y;
  this.color = '#000';

  this.update = () => {
    this.x = 2 * radius * Math.cos(1 * time);
    this.y = 2 * radius * Math.sin(1 * time);

    this.draw();
  }

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();

    c.moveTo(0, 0);
    c.lineTo(this.x, this.y);
    c.strokeStyle = '#000';
    c.stroke();
    c.closePath();
  }
}

// Implementation
let circle, ind;
function init() {
  // remap coordinates
  c.translate(400, canvas.height / 2);

  circle = new Circle(0, 0, radius * 2, '#000');
  ind = new Indicator(0, 0);
}

// Animation Loop
let time = 0;
let wave = [];
let radius = 50 * (4 / (1 * Math.PI));

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);

  circle.update();
  ind.update();
  wave.unshift(ind.y);

  line(ind.x, ind.y, 200, wave[0]);
  for (let i = 0; i < wave.length; i++) {
    point(i + 200, wave[i]);
  }

  if (wave.length > 800) { wave.pop(); }
  time += 0.05;
}

init();
animate();
