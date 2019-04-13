
import * as PIXI from 'pixi.js/dist/pixi.js';
import * as TWEEN from '@tweenjs/tween.js';

import Section from './section';

import FogParticle from '../particle/fog'

export default class Rally extends Section {

  frame: any;
  mask: any;
  shadow: any;
  imageandeffects: any;
  img: any;
  format: any = {
    w: 0,
    h: 0
  };
  framescale: number;
  effects: any;
  maxparticles: number = 100;
  particles:any = {};
  ticker: any;

  constructor(config) {

    super(config);
  }

  /* PRIVATE */

  _animate() {

    // OSCILATION 
    // oscilator    | reduct to 0-1                |  atenuador    
    let variation = (this.game.oscilator.y + 1) / 2 / 100;

    this.frame.scale.x =
    this.frame.scale.y = 1 + variation;

    // Particle

    let newid = PIXI.utils.uid();

    this.particles[newid] = new FogParticle({
      id: newid,
      host: this,
      texture: this.game.texture.get('img/particlefog.png'),
      parent: this.effects,
      x: this.game.sceneW / 2,
      y: this.game.sceneH / 2
    });
  }

  /* PUBLIC */

  createSection() {

    super.createSection();

    let blur = new PIXI.filters.BlurFilter();

    this.shadow = new PIXI.Graphics();
    this.shadow.name = 'SHADOW';
    this.shadow.alpha = 0.4;
    this.shadow.filters = [blur];
    this.frame = new PIXI.Container();
    this.frame.name = 'FRAME';
    this.frame.x = this.game.margin;
    this.frame.y = this.game.margin;
    this.imageandeffects = new PIXI.Container();
    this.imageandeffects.name = 'IMAGEFECTS';
    this.effects = new PIXI.particles.ParticleContainer(
      this.maxparticles,
      {
        scale: true,
        rotation: true
      }
    );
    this.effects.name = 'EFFECTS';
    this.mask = new PIXI.Graphics();
    this.mask.name = 'MASK';

    this.container.addChild(this.shadow);
    this.frame.addChild(this.imageandeffects);
    this.container.addChild(this.frame);
    this.container.addChild(this.mask);    
    this.frame.mask = this.mask;

    Promise.all([
      this.game.texture.load('img/rally-a.jpg'),
      this.game.texture.load('img/particlefog.png')
    ])
    .then(
      () => {

        this.img = new PIXI.Sprite(this.game.texture.get('img/rally-a.jpg'));
        this.img.name = 'IMAGE'; 
        this.format = {
          w: this.img.width,
          h: this.img.height
        };
        this.imageandeffects.addChild(this.img);
        this.imageandeffects.addChild(this.effects);

        this.resize();

        this.ticker = this.game.tickeremitter.subscribe(this._animate.bind(this));
      }
    );
  }

  clearSection() {

    this.ticker.unsubscribe();

    Object.keys(this.particles)
    .forEach(key => this.particles[key].remove());

    super.clearSection();
  }

  resize() {

    super.resize();

    let newW = this.game.sceneW - this.game.margin * 2;
    let newH = this.game.sceneH - this.game.margin * 2;

    this.frame.width = newW;
    this.frame.height = newH;

    this.mask
        .clear()
        .beginFill(0xffffff, 1)
        .drawRoundedRect(
          this.game.margin,
          this.game.margin,
          newW,
          newH,
          this.game.roundframe
        )
        .endFill();

    this.shadow
        .clear()
        .beginFill(0x000000, 1)
        .drawRoundedRect(
          this.game.margin - 5,
          this.game.margin -5,
          newW + 10,
          newH + 10,
          this.game.roundframe + 5
        )
        .endFill();

    this.game.style.covercontainer({
      game: this.game,
      format: this.format,
      containerdimensions: {
        w: newW,
        h: newH
      },
      content: this.imageandeffects,
      relposition: {
        x: 3,
        y: 3 // middle
      }
    });
  }
}