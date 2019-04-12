
import * as PIXI from 'pixi.js';

export default class BubbleParticle {

  id: number;
  host: any;
  sprite: any;
  ticker: any;
  velocity: any = {
    x: 0,
    y: 0
  };
  gravity: number = -0.1;

  constructor(config) {

    this.id = config.id;
    this.host = config.host;

    this.sprite = new PIXI.Sprite(config.texture);
    this.sprite.anchor.set(0.5);
    this.sprite.alpha = 1;
    this.sprite.x = config.x;
    this.sprite.y = config.y;
    this.sprite.scale.x = 
    this.sprite.scale.y = 0.2;
    this.sprite.tint = config.color;

    let angle = Math.random() * 360;
    let radians = angle * Math.PI / 180;
    let speed = 2 + Math.random() * 4;

    this.velocity.x = Math.cos(radians) * speed;
    this.velocity.y = Math.sin(radians) * speed;

    config.parent.addChild(this.sprite);

    this.ticker = this.host.game.tickeremitter.subscribe(this._animate.bind(this));
  }

  /* private */

  private _animate(delta) {

    if(!this.sprite) {

      this.ticker.unsubscribe();
      return
    }

    if(this.sprite.alpha < 0) {

      this.ticker.unsubscribe();
      this.sprite.destroy();

      return;
    }

    this.velocity.y += this.gravity;

    this.sprite.x += this.velocity.x;
    this.sprite.y += this.velocity.y;

    this.sprite.alpha -= 0.01;
  }

  /* PUBLIC */

  public remove() {

    this.ticker.unsubscribe();
    this.sprite.destroy();
    this.host.particles[this.id] = null;
    delete this.host.particles[this.id];
  }
}