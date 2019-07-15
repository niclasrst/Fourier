function fourierTransform(x) {
  const N = x.length;
  let X = [];

  // sum(x * (cos( 2 * pi * k * n ) - i * sin( 2 * pi * k * n )))
  //         |  real part = re    |      |imaginary part = im |
  // 2 * pi * k * n = alpha

  for (let k = 0; k < N; k++) {
    let re = 0, im = 0;

    for (let n = 0; n < N; n++) {
      let alpha = (2 * Math.PI * k * n) / N;

      re += x[n] * Math.cos(alpha);
      im -= x[n] * Math.sin(alpha);
    }

    re /= N;
    im /= N;

    let freq  = k;
    let amp = Math.sqrt(re ** 2 + im ** 2);
    let phase = Math.atan2(im, re);

    X[k] = { re, im, freq, amp, phase };
  }

  return X;
}
