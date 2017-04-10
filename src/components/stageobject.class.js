import Vector2D from './vector2d.js';

export default class StageObject {
  constructor({
    internal = false,
    left = 0,
    top = 0,
    width = 0,
    height = 0,
    stroke = 1,
    strokeColor = '#3d3d3d',
    fill = '#CCC',
    canvas = null,
  } = {}) {
    this.internal = internal;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.stroke = stroke;
    this.strokeColor = strokeColor;
    this.fill = fill;
    this.canvas = canvas;
  }

  set(data, rerender = false) {
    for(let [k, v] of Object.entries(data)) {
      this[k] = v;
    }

    if(rerender && this.canvas) this.canvas.render();
  }

  get right() {
   return this.left + this.width;
  }

  get bottom() {
   return this.top + this.height;
  }

  get topLeft() {
   return new Vector2D(this.left, this.top);
  }

  get topRight() {
   return new Vector2D(this.right, this.top);
  }

  get bottomLeft() {
   return new Vector2D(this.left, this.bottom);
  }

  get bottomRight() {
   return new Vector2D(this.right, this.bottom);
  }

  _hitTest(ev, stage) {
    let p = new Vector2D(ev.clientX, ev.clientY);
    p = stage.transformPoint(p);

    if(p.Y > this.top && p.Y < this.bottom &&
      p.X > this.left && p.X < this.right) {
      return true;
    }

    return false;
  }

  draw(ctx) {
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.strokeColor;
  }
}
