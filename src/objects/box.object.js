import StageObject from '../components/stageobject.class.js';

export default class Box extends StageObject {
  constructor(params) {
    super(params);
    this.tlRadius = this.trRadius = this.brRadius = this.blRadius = 0;
  }

  setRadius(t, r, b, l) {
    if(Number.isInteger(t) && !r && !b && !l) {
      this.setRadius(t, t, t, t);
      return this;
    }

    if(Number.isInteger(t) && Number.isInteger(r) && !b && !l) {
      this.setRadius(t, r, t, r);
      return this;
    }

    this.set({
        'tlRadius': t, 'trRadius': r,
        'brRadius': b, 'blRadius': l,
    }, false);

    return this;
  }

  imagine(context) {
    let r = this.left + this.width;
    let b = this.top + this.height;

    context.beginPath();
    context.moveTo(this.left + this.tlRadius, this.top);

    context.lineTo(r-this.tlRadius, this.top);
    context.quadraticCurveTo(r, this.top, r, this.top + this.trRadius);

    context.lineTo(r, this.top + this.height - this.trRadius);
    context.quadraticCurveTo(r, b, r-this.brRadius, b);

    context.lineTo(this.left + this.brRadius, b);
    context.quadraticCurveTo(this.left, b, this.left, b - this.blRadius);

    context.lineTo(this.left, this.top + this.blRadius);
    context.quadraticCurveTo(this.left, this.top,
      this.left + this.tlRadius, this.top);
    context.closePath();
  }

  draw(context) {
    super.draw(context);

    context.save();

    this.imagine(context);
    context.stroke();
    context.fill();

    context.restore();
  }
}
