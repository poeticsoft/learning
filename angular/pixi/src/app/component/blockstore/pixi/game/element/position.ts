
import * as PIXI from 'pixi.js/dist/pixi.js';

import Element from './element';

export default class Position extends Element {

  stage: any = {};
  spring: number = 0.01;
  friction: number = 0.95;
  threshold: number = 0.01;
  gpoint: any = {
    x: 250,
    y: 250
  };
  subscription: any;

  constructor(config) {

    super(config);
    
    this.container.name = 'POSITION';

    this.stage.circle = new PIXI.Graphics();           
    this.stage.circle.beginFill(0x000000);
    this.stage.circle.drawCircle(0, 0, 10);
    this.stage.circle.endFill();
    this.stage.circle.x = 100;
    this.stage.circle.y = 100;
    this.stage.circle.v = { x: 0, y: 0 };

    this.container.addChild(this.stage.circle);
  }

  private _tick(delta) {

    let dX = this.gpoint.x - this.stage.circle.x;
    let dY = this.gpoint.y - this.stage.circle.y;

    this.stage.circle.v.x += dX * this.spring;
    this.stage.circle.v.y += dY * this.spring;
    this.stage.circle.v.x *= this.friction;
    this.stage.circle.v.y *= this.friction;

    this.stage.circle.x += this.stage.circle.v.x;
    this.stage.circle.y += this.stage.circle.v.y;

    if(
      Math.abs(this.stage.circle.v.x) < this.threshold && 
      Math.abs(this.stage.circle.v.y) < this.threshold
    ) {

      this.subscription.unsubscribe();
    }
  }

  setlayout(layout) {

    if(this.subscription) { this.subscription.unsubscribe(); }

    let x = layout.position.x || this.stage.circle.x;
    let y = layout.position.y || this.stage.circle.y;

    this.gpoint = { x: x, y: y };
    this.subscription = this.game.tickeremitter.subscribe(this._tick.bind(this));
  }
}