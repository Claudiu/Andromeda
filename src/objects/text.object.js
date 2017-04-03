import StageObject from '../components/stageobject.class.js';

export default class Text extends StageObject {
  constructor(obj) {
    super(obj);
    this.text = obj.text || 'Text';
    this.fontSize = obj.fontSize || '14';
    this.fontFamily = obj.fontFamily || 'Arial';
    this.fontStyle = obj.fontStyle || '';
  }

  draw(ctx) {
    super.draw(ctx);
    ctx.font = `${this.fontStyle} ${this.fontSize}px ${this.fontFamily}`;
    ctx.fillText(this.text, this.left, this.top);
  }
}
