import Point from '../utils/point.class.js';
import {Renderer} from './renderer.class.js';

/**
 * Class represeting a drawable canvas stage.
 */
export default class Stage {
  /**
   * constructor - Creates a new Stage instance.
   *
   * @param  string node ID attribute of the canvas element or canvas element.
   */
  constructor(node) {
    if(typeof node === 'string') node = document.getElementById(node);
    this.context = node.getContext('2d');
    this.node = node;
    this.objects = [];
    this.pan = {X: 0, Y: 0};
    this.renderer = new Renderer();

    this.updateSize();
    this._initEventListeners();
  }

  get width() {
    return this.node.getAttribute('width');
  }

  get height() {
    return this.node.getAttribute('height');
  }

  _pixelRatio() {
    let dpr = window.devicePixelRatio || 1;
    let bsr = this.context.webkitBackingStorePixelRatio ||
      this.context.mozBackingStorePixelRatio ||
      this.context.msBackingStorePixelRatio ||
      this.context.oBackingStorePixelRatio ||
      this.context.backingStorePixelRatio || 1;
    return dpr / bsr;
  }

  transformPoint(p) {
    return p.update(p.X - this.pan.X, p.Y - this.pan.Y);
  }

  updateSize() {
    let ratio = this._pixelRatio();

    let w = document.body.clientWidth;
    let h = document.body.clientHeight;

    this.node.setAttribute('width', w * ratio);
    this.node.setAttribute('height', h * ratio);

    this.node.style.width = `${w}px`;
    this.node.style.height = `${h}px`;

    this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  add(obj) {
    this.trigger('object:added');
    obj.canvas = this;
    this.objects.unshift(obj);
  }

  _initEventListeners() {
    for(let ev of ['click', 'mousedown', 'mouseup', 'wheel']) {
        this.on(ev, (e) => {
          for(let obj of this.objects) {
            if(!obj._hitTest(e, this)) {
              continue;
            }

            this.trigger(`object:${ev}`, {
              point: this.transformPoint(new Point(e.clientX, e.clientY)),
              obj: obj,
              originalEvent: e,
            });

            break;
          }
        });
    }
  }

  _clearFrame() {
    this.context.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  absolutePan(X = 0, Y = 0) {
    this.pan = {X, Y};
    return this;
  }

  trigger(type, data = {}) {
    let ev = new Event(type, {});
    Object.assign(ev, data);
    this.node.dispatchEvent(ev);
  }

  on(event, cb) {
    this.node.addEventListener(event, cb);
  }

  relativePan(x = 0, y = 0) {
    this.pan = {X: this.pan.X + x, Y: this.pan.Y + y};
    return this;
  }

  render() {
    this._clearFrame();
    this.trigger('before:render');

    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.translate(this.pan.X, this.pan.Y);
    for (let obj of this.objects) {
      obj.draw(this.context);
    }

    this.trigger('after:render');
  }
}
