class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(vec) {
    return this.x == vec.x && this.y == vec.y;
  }

  static equals(vec1, vec2) {
    return vec1.x == vec2.x && vec1.y == vec2.y;
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  static add(vec1, vec2) {
    return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
  }

  sub(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  static sub(vec1, vec2) {
    return new Vector(vec1.x - vec2.x, vec1.y - vec2.y);
  }

  mult(n) {
    this.x *= n;
    this.y *= n;
  }

  static mult(vec, n) {
    return new Vector(vec.x * n, vec.y * n);
  }

  div(n) {
    this.x /= n;
    this.y /= n;
  }

  static div(vec, n) {
    return new Vector(vec.x / n, vec.y / n);
  }

  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }

  static dot(vec1, vec2) {
    return vec1.x * vec2.x + vec1.y * vec2.y;
  }

  mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  static mag(vec) {
    return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
  }

  setMag(n) {
    this.x = this.x * n / this.mag();
    this.y = this.y * n / this.mag();
  }

  static setMag(vec, n) {
    vec.x = vec.x * n / vec.mag();
    vec.y = vec.y * n / vec.mag();
  }

  limit(n) {
    if (this.mag() > n) {
      this.setMag(n);
    }
  }

  static limit(vec, n) {
    if (vec.mag() > n) {
      vec.setMag(n);
    }
  }

  norm() {
    this.div(this.mag());
  }

  static norm(vec) {
    vec.div(vec.mag());
  }

  rotate(angle) {
    this.x = Math.cos(angle * this.x) - Math.sin(angle * this.y);
    this.y = Math.sin(angle * this.x) - Math.cos(angle * this.y);
  }

  static rotate(vec, angle) {
    return new Vector(Math.cos(angle * vec.x) - Math.sin(angle * vec.y), Math.sin(angle * vec.x) - Math.cos(angle * vec.y));
  }

  getAngleTo(vec) {
    return Math.acos(this.dot(vec) / (this.mag() * vec.mag()));
  }

  static angleBetween(vec1, vec2) {
    return Math.acos(vec1.dot(vec2) / (vec1.mag() * vec2.mag()));
  }

  static fromAngle(angle, len=1) {
    return new Vector(len * Math.cos(angle), len * Math.sin(angle));
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  static copy(vec) {
    return new Vector(vec.x, vec.y);
  }

  mapFunc(func) {
    this.x = func(this.x);
    this.y = func(this.y);
  }

  static mapFunc(vec, func) {
    return new Vector(func(vec.x), func(vec.y));
  }

  static toArray(vec) {
    return [vec.x, vec.y];
  }

  static fromArray(arr) {
    return new Vector(arr[0], arr[1]);
  }

  static random2D() {
    return this.fromAngle(Math.random() * (Math.PI * 2))
  }

  static constrain(n, low, high) { // Keeps a variable away from reaching exactly low and exactly high
    return Math.max(Math.min(n, high), low);
  }
}
