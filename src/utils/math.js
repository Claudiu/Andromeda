/**
 * clamp - Clamps a value between a minimum float and maximum float value.
 *
 * @param  {Number} n = 1.0         value
 * @param  {Number} min = -Infinity lower bound
 * @param  {Number} max = Infinity  upper bound
 * @return {Number}                 clamped value
 */
function clamp(n = 1.0, min = -Infinity, max = Infinity) {
  return Math.min(Math.max(n, min), max);
}

/**
 * lerp - In mathematics, linear interpolation is a method of curve fitting
 * using linear polynomials to construct new data points within the
 * range of a discrete set of known data points.
 * Wikipedia: {@link https://en.wikipedia.org/wiki/Linear_interpolation}
 *
 * @param  {Number} v0              start - t 0
 * @param  {Number} v1              end - t 1
 * @param  {Number} t = 0.5         value between 0.0 and 1.0
 * @return {Number}                 value
 */
function lerp(v0, v1, t = 0.5) {
  t = clamp(t, 0.0, 1.0);
  return (1 - t) * v0 + t * v1;
}

/**
 * deCasteljau - In the mathematical field of numerical analysis,
 * De Casteljau's algorithm is a recursive method to evaluate polynomials
 * in Bernstein form or Bézier curves, named after its inventor
 * Paul de Casteljau.
 * Wikipedia: {@link http://en.wikipedia.org/wiki/De_Casteljau's_algorithm}
 *
 * @param  {Array} points = []      Array of bézier points.
 * @param  {Number} t = 0.5         value between 0.0 and 1.0
 * @return {Number}                 point at t
 */
function deCasteljau(points = [], t = 0.5) {
  if(t == 1) return points[points.length - 1];
  if(t == 0) return points[0];
  if(points.length == 1) return points[0];

  let computed = [];
  for (let i = 1, len = points.length; i < len; i++) {
    computed.push([
      lerp(points[i - 1][0], points[i][0], t), // X lerp
      lerp(points[i - 1][1], points[i][1], t), // Y lerp
    ]);
  }

  return deCasteljau(computed, t);
}

export {clamp, lerp, deCasteljau};
