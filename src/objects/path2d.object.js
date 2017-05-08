import StageObject from '../components/stageobject.class.js';

export default class Path extends StageObject {
  constructor(obj) {
    super(obj);
    this.text = obj.text || 'Text';
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.font = `${this.fontStyle} ${this.fontSize}px ${this.fontFamily}`;
    ctx.fillText(this.text, this.left, this.top);
  }
}
