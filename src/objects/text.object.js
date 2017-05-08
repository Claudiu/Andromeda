import StageObject from '../components/stageobject.class.js';

export default class Text extends StageObject {
  constructor(obj) {
    super(obj);
    this.text = obj.text || 'Text';
    this.fontSize = obj.fontSize || '14';
    this.fontFamily = obj.fontFamily || 'Arial';
    this.fontStyle = obj.fontStyle || '';
  }

  get font() {
    return `${this.fontStyle} ${this.fontSize}px ${this.fontFamily}`;
  }

  set width(val) {
      return;
  }

  set height(val) {
      return;
  }

  get width() {
    this.stage.context.font = this.font;
    return this.stage.context.measureText(this.text).width;
  }

  get height() {
    this.stage.context.font = this.font;
    return this.stage.context.measureText(this.text).height;
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.font = this.font;
    ctx.fillText(this.text, this.left, this.top);
  }
}
