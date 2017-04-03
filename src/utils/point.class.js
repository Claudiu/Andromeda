/** Class prepreseting a point in 2D space. */
export default class Point {
  /**
  * Create a point.
  * @param {number} X - The x value.
  * @param {number} Y - The y value.
  */
  constructor(X = 0, Y = 0) {
    this.X = X;
    this.Y = Y;
  }

  equals(p = new Point(0, 0)) {
    return this.X == p.X && this.Y == p.Y;
  }

  /**
  * Update Point Coords.
  * @param {number} X - The x value.
  * @param {number} Y - The y value.
  * @return {Point} Point instance
  */
  update(X = this.X, Y = this.Y) {
    this.X = X;
    this.Y = Y;
    return this;
  }

  static random() {
    return new Point(Math.random(), Math.random());
  }

  /**
  * Calculate middle point between this point and another.
  * @param {Point} p - The other point.
  * @return {Point} New middle point.
  */
  midpoint(p) {
    let X = p.X + this.X; X = X / 2;
    let Y = p.Y + this.Y; Y = Y / 2;
    return new Point(X, Y);
  }

  clone() {
    return new Point(this.X, this.Y);
  }

  toString() {
    return `{x:${this.X}, y:${this.Y}}`;
  }
}
