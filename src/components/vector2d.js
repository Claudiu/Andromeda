/** Class prepreseting a point in 2D space. */
export default class Vector2D {
  /**
  * Create a point.
  * @param {number} x - The x value.
  * @param {number} y - The y value.
  */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * add - description
   *
   * @param  {Vector2D|Number} p description
   * @return {Vector2D}   description
   */
  add(p) {
    if (p instanceof Vector2D) {
      return new Vector2D(this.x + p.x, this.y + p.y);
    }

    return new Vector2D(this.x + p, this.y + p);
  }

  multiply(p) {
    if (p instanceof Vector2D) {
      return new Vector2D(this.x * p.x, this.y * p.y);
    }

    return new Vector2D(this.x * p, this.y * p);
  }

  subtract(p) {
    if (p instanceof Vector2D) {
      return new Vector2D(this.x - p.x, this.y - p.y);
    }

    return new Vector2D(this.x - p, this.y - p);
  }

  divide(p) {
    if(p === 0 || p.x === 0 || p.y === 0) {
      console.error('Division by 0.');
      return this.clone();
    }

    if (p instanceof Vector2D) {
      return new Vector2D(this.x / p.x, this.y / p.y);
    }

    return new Vector2D(this.x / p, this.y / p);
  }

  crossProduct(other = new Vector2D()) {
    let p = this.multiply(other);
    return p.x - p.y;
  }

  dotProduct(other = new Vector2D()) {
    let p = this.multiply(other);
    return p.x + p.y;
  }

  negate() {
    return this.multiply(-1);
  }

  squaredDistance(point = new Vector2D()) {
    let p = this.subtract(point);
    p = p.this.multiply(p);
    return p.x + p.y;
  }

  distance(p = new Vector2D()) {
    return Math.sqrt(this.squaredDistance(p));
  }

  eq(p = new Vector2D()) {
    if(this.x == p.x && this.y == p.y) {
      return true;
    }

    return false;
  }

  lt(p = new Vector2D()) {
    if(this.x < p.x && this.y < p.y) {
      return true;
    }

    return false;
  }

  gt(p = new Vector2D()) {
    if(this.x > p.x && this.y > p.y) {
      return true;
    }

    return false;
  }

  perpendicular() {
    return new Vector2D(-this.y, this.x);
  }

  isNaN() {
    return isNaN(this.y) || isNaN(this.x);
  }

  unit() {
    return this.multiply(1 / this.magnitude());
  }

  /**
  * length - Returns the length of the vector.
  *
  * @return {number}  description
  */
  magnitude() {
    return Math.sqrt(this.squaredMagnitude());
  }

  squaredMagnitude() {
    let sq = this.multiply(this);
    return sq.x + sq.y;
  }

  /**
  * isZero - description
  *
  * @return {type}  description
  */
  isZero() {
    return this.eq(new Vector2D(0, 0));
  }

  /**
  * swap - description
  *
  * @return {type}  description
  */
  swap() {
    return new Vector2D(this.y, this.x);
  }

  /**
  * Update Vector2D Coords.
  * @param {number} x - The x value.
  * @param {number} y - The y value.
  * @return {Vector2D} Vector2D instance
  */
  update(x = this.x, y = this.y) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
  * @static random - description
  *
  * @return {type}  description
  */
  static random() {
    return new Vector2D(Math.random(), Math.random());
  }

  reflect(normal = new Vector2D()) {
    return this.clone().subtract(
      normal.clone().multiply(this.dotProduct(normal)).multiply(2)
    );
  }

  angleBetween(other = new Vector2D()) {
      let lenProduct = this.magnitude() * other.magnitude();
      let f = this.dotProduct(other) / lenProduct;

      if(f < -1.0) f = -1.0;
      if(f > 1.0) f = 1.0;

      return Math.acos(f);
  }

  angleTo(other = new Vector2D()) {
    let angle = this.angleBetween(other);
    if(this.crossProduct(other) < 0) {
      angle = 2 * Math.PI - angle;
    }

    return angle;
  }

  /**
  * Calculate middle point between this point and another.
  * @param {Vector2D} p - The other point.
  * @return {Vector2D} New middle point.
  */
  midpoint(other = new Vector2D()) {
    return this.add(other).divide(2);
  }

  /**
  * clone - description
  *
  * @return {type}  description
  */
  clone() {
    return new Vector2D(this.x, this.y);
  }

  findNearest(arrayOfVector2Ds = []) {
    let found = false;
    let dist = 1 / 0;
    for (let i = 0; i < arrayOfVector2Ds.length; i++) {
      let currentDistance = arrayOfVector2Ds[i].squaredDistance(this);
      if(currentDistance < dist) {
        found = arrayOfVector2Ds[i];
        dist = currentDistance;
      }
    }

    return found;
  }

  /**
  * toString - description
  *
  * @return {type}  description
  */
  toString() {
    return `{x:${this.x}, y:${this.y}}`;
  }
}
