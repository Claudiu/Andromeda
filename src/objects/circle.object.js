import StageObject from '../components/stageobject.class.js';

export default class Circle extends StageObject {
  constructor(params) {
    super(params);
    this.radius = params.radius;
  }

  draw(context) {
    super.draw(context);

    context.beginPath();
    context.arc(this.left - this.radius, this.top - this.radius,
      this.radius, 0, 2 * Math.PI, false);
    context.closePath();

    context.fill();
    context.stroke();
  }
}
