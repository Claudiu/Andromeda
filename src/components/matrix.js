export default class Matrix {
  constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
    console.log(this);
    this.matrix = [
      a, c, e,
      b, d, f,
      0, 0, 1,
    ];
  }

  get a() {
    return this.matrix[0];
  }

  get b() {
    return this.matrix[3];
  }

  get c() {
    return this.matrix[1];
  }

  get d() {
    return this.matrix[4];
  }

  get e() {
    return this.matrix[2];
  }

  get f() {
    return this.matrix[5];
  }

  get scaleX() {
    return Math.sqrt(this.a * this.a + this.b * this.b);
  }

  get scaleY() {
    return Math.sqrt(this.c * this.c + this.d * this.d);
  }

  get offsetX() {
    return this.e;
  }

  get offsetY() {
    return this.f;
  }

  setScale(a = 1, d = a) {
    this.matrix[0] = a;
    this.matrix[4] = d;
    return this;
  }

  inverse() {
    let inverse = new Matrix();
    inverse.matrix = this.matrix.slice(0);

    let d = 1 / (inverse.a * inverse.b - inverse.c * inverse.e);
    let m0 = inverse.b * d;
    let m1 = inverse.c * d;
    let m2 = -inverse.e * d;
    let m3 = inverse.a * d;

    let m4 = d * (inverse.e * inverse.f - inverse.b * inverse.d);
    let m5 = d * (inverse.c * inverse.d - inverse.a * inverse.f);

    inverse.matrix = [m0, m1, m2,
                      m3, m4, m5,
                      0, 0, 1];

    return inverse;
  }

  // setSkew(b = 0, c = b) {
  //   this.matrix[1] = b;
  //   this.matrix[4] = d;
  //   return this;
  // }
}
