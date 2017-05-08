export default class Matrix {
  // a	Horizontal scaling
  // b	Horizontal skewing
  // c	Vertical skewing
  // d	Vertical scaling
  // e	Horizontal moving
  // f	Vertical moving
  constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
    console.log(this);
    this.matrix = [
      a, c, e,
      b, d, f,
      0, 0, 1,
    ];
  }

  get scaleX() {
    return this.matrix[0];
  }

  get scaleY() {
    return this.matrix[4];
  }

  get translateX() {
    return this.matrix[5];
  }

  get translateY() {
    return this.matrix[6];
  }

  setScale(a = 1, d = a) {
    this.matrix[0] = a;
    this.matrix[4] = d;
    return this;
  }

  // setSkew(b = 0, c = b) {
  //   this.matrix[1] = b;
  //   this.matrix[4] = d;
  //   return this;
  // }
}
