
import * as PIXI from 'pixi.js/dist/pixi.js';

export default class FogParticle {

  id: number;
  host: any;
  sprite: any;
  ticker: any;
  velocity: any = {
    x: 0,
    y: 0
  };
  gravity: number = -0.2;
  rotation: number;
  expand: number;
  sourcemap: any[] = [
    { x: 242, y: 426 },
    { x: 193, y: 349 },
    { x: 278, y: 319 },
    { x: 355, y: 312 },
    { x: 406, y: 312 }
  ]

  constructor(config) {

    this.id = config.id;
    this.host = config.host;
    this.sprite = new PIXI.Sprite(config.texture);
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 1;
    this.sprite.die = 0.02;
    this.sprite.scale.x = 
    this.sprite.scale.y = 0.6;
    this.sprite.tint = 0xcfcfc8;

    let angle = Math.random() * 360;
    let radians = angle * Math.PI / 180;
    let speed = 2 + Math.random() * 4;
    let randpos = Math.floor(Math.random() * this.sourcemap.length);

    this.velocity.x = Math.cos(radians) * speed;
    this.velocity.y = Math.sin(radians) * speed;
    this.rotation = (Math.random() - .5) / 10;
    this.expand = 1.05;
    this.sprite.x = this.sourcemap[randpos].x;
    this.sprite.y = this.sourcemap[randpos].y;

    config.parent.addChild(this.sprite);

    this.ticker = this.host.game.tickeremitter.subscribe(this._animate.bind(this));
  }

  /* PRIVATE */

  private _animate(delta) {

    if(this.sprite.alpha < 0) {

      
      return this.remove();
    }

    this.velocity.y += this.gravity;

    this.sprite.x += this.velocity.x;
    this.sprite.y += this.velocity.y;
    this.sprite.scale.x *= this.expand;
    this.sprite.scale.y *= this.expand;
    this.sprite.rotation += this.rotation;

    this.sprite.alpha -= this.sprite.die;
  }

  /* PUBLIC */

  public remove() {

    this.ticker.unsubscribe();
    this.sprite.destroy();
    this.host.particles[this.id] = null;
    delete this.host.particles[this.id];
  }
}
