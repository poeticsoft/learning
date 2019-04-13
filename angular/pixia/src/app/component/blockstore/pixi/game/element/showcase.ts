
import * as PIXI from 'pixi.js';

import Element from './element';

import BubbleParticle from '../particle/bubble';

export default class Showcase extends Element {

  img: any;
  maskcanvas
  maskgraphic: any;
  masktexture: any;
  mask: any;
  effects: any;
  maxparticles: number = 1000;
  explodecount: number = 60;
  particles: any = {};
  guides: any;
  format: any = {
    w: 0,
    h: 0
  }
  imgpixel: any[];
  slot: any = {
    x: [],
    y: []
  };
  alphathreshold: number = 10;
  actualslot: any = {
    x: null,
    y: null
  };

  constructor(config) {

    super(config);
    
    this.container.name = 'SHOWCASE';
    this.slot = config.slot;

    Promise.all([
      this.game.texture.load(config.img),
      this.game.texture.load('img/bubble-a.png')
    ])
    .then(
      () => {

        /* showcase image (in slots) */

        this.img = new PIXI.Sprite(this.game.texture.get(config.img));
        this.img.name = 'IMAGE';
        this.format = {
          w: this.img.width,
          h: this.img.height
        };        
        this.img.interactive = true;
        this.img.buttonMode = true;
        this.img
            .on('pointerdown', this._down.bind(this))
            .on('pointerup', this._up.bind(this))
            .on('pointerupoutside', this._up.bind(this))
            .on('pointermove', this._move.bind(this));
        this.imgpixel = this.game.app.renderer.extract.pixels(this.img);

        /* Showcase mask */

        this.masktexture = PIXI.RenderTexture.create(this.img.width, this.img.height);
        this.mask = new PIXI.Sprite(this.masktexture);
        this.maskgraphic = new PIXI.Graphics();

        this.img.mask = this.mask;

        this.container.addChild(this.img);
        this.container.addChild(this.mask);

        this._changeSlot();

        /* GUIDES
        this.guides = new PIXI.Graphics();
        this.guides.name = 'GUIDES';
        this.guides.lineStyle(5, 0x000000);
        this.slot.x.forEach(
          x => {

            this.guides.moveTo(x, 0);
            this.guides.lineTo(x, 500);
          }
        );
        this.container.addChild(this.guides);
        */

        /* particles */
        this.effects = new PIXI.particles.ParticleContainer(
          this.maxparticles,
          {
            tint: true,
            rotation: true
          }
        );
        this.effects.name = 'EFFECTS';
        this.container.addChild(this.effects);

        this.setlayout();
      }
    );
  }

  /* PRIVATE */

  private _explode(pos, color) {

    for(let p=0; p< this.explodecount; p++) {      

      let newid = PIXI.utils.uid();

      this.particles[newid] = new BubbleParticle({
        id: newid,
        host: this,
        texture: this.game.texture.get('img/bubble-a.png'),
        parent: this.effects,
        x: pos.x,
        y: pos.y,
        color: color
      });
    }
  }

  private _getSlot(pos) {

    let x = this.slot.x.filter(
      item => { return item < pos.x; }
    ).length;

    let y = this.slot.y.filter(
      item => { return item < pos.y; }
    ).length;

    return {
      x: x,
      y: y
    };
  }

  private _down(E) {

    let pointPos = E.data.getLocalPosition(this.container);
    let normalizedPoint = {
      x: Math.floor(pointPos.x),
      y: Math.floor(pointPos.y)
    };
    let index = (normalizedPoint.y * this.format.w + normalizedPoint.x) * 4;
    let color = this.game.style.rgbtohex({
      r: this.imgpixel[index],
      g: this.imgpixel[index + 1],
      b: this.imgpixel[index + 2]
    });
    let coloralpha = this.imgpixel[index + 3];
    if(coloralpha > this.alphathreshold) {
      
      let slot = this._getSlot(normalizedPoint);
      let changed: boolean = false;

      if(this.actualslot.x != slot.x) {

        this.actualslot.x = slot.x;
        changed = true;
      }

      if(this.actualslot.y != slot.y) {

        this.actualslot.y = slot.y;
        changed = true;
      }

      if(changed) { 

        this._changeSlot();
      }

      this._explode(pointPos, color);

      E.stopPropagation();
    }
  }

  private _up(E) { }

  private _move(E) { }

  private _changeSlot() {

    this.maskgraphic.clear();

    // Semi transparent all slots

    this.maskgraphic.beginFill(0x666666, 1);
    this.maskgraphic.drawRect(0, 0, this.img.width, this.img.height);
    this.maskgraphic.endFill();

    // Opaque slot over

    if(this.actualslot.x) {

      let x = this.slot.x[this.actualslot.x - 1];
      let w = this.slot.x[this.actualslot.x] - this.slot.x[this.actualslot.x - 1];

      this.maskgraphic.beginFill(0xffffff, 1);
      this.maskgraphic.drawRect(x, 0, w, this.img.height);
      this.maskgraphic.endFill();
    }

    // update mask

    this.game.app.renderer.render(this.maskgraphic, this.masktexture);
  }

  /* PUBLIC */

  setlayout() {

    this.container.y = this.game.sceneH - this.img.height;
  }

  remove() {

    Object.keys(this.particles)
    .forEach(key => this.particles[key].remove());
  }
}