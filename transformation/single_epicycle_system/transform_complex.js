class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }

  add(c) {
    this.re += c.re;
    this.im += c.im;
  }

  mult(c) {
    return new Complex(this.re * c.re - this.im * c.im, this.re * c.im + this.im * c.re);
  }
}

function fourierTransform(x) {
  const N = x.length;
  let X = [];

  // sum(x * (cos( 2 * pi * k * n ) - i * sin( 2 * pi * k * n )))
  //         |  real part = re    |      |imaginary part = im |
  // 2 * pi * k * n = alpha

  for (let k = 0; k < N; k++) {
    let complex = new Complex(0, 0);

    for (let n = 0; n < N; n++) {
      const alpha = (2 * Math.PI * k * n) / N;
      const c = new Complex(Math.cos(alpha), -Math.sin(alpha));

      // a + b = (x * yi) + (u * vi) = (x + u) + (y + v) * i
      // a * b = (x + yi) + (u + vi) = xu + xvi + yui - yv = (xu - yv) + (xv + yu) * i
      //                                                     |  real |  |imaginary|
      complex.add(x[n].mult(c));
    }

    complex.re /= N;
    complex.im /= N;

    let freq = k;
    let amp = Math.sqrt(complex.re ** 2 + complex.im ** 2);
    let phase = Math.atan2(complex.im, complex.re);

    X[k] = { re: complex.re, im: complex.im, freq, amp, phase };
  }

  return X;
}
