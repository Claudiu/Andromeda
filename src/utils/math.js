
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

export {clamp};
