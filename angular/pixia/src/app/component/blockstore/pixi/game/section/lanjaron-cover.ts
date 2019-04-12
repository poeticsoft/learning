
import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';

import Section from './section';

import ResponsiveBGText from '../element/responsivebgtext';
import Showcase from '../element/showcase';

export default class LanjaronCover extends Section {

  game: any;
  container: any;
  margin: number = 2; // Percent of sceneWidth

  // Slogan
  sloganwidth: number = 70;

  constructor(config) {

    super(config);
  }

  /* PRIVATE */

  private _ticker(delta) {

    this.element.slogan.container.y = 200 + this.game.oscilator.y * 5;
  }

  /* PUBLIC */

  createSection() {

    super.createSection();
  
    this.element.slogan = new ResponsiveBGText({
      game: this.game,
      text: 'LANJARÓN\nTE HACE GANAR MÁS',
      styleName: 'danoneslogan',
      backgroundColor: 0xff0000,
      rmargin: this.margin,
      rwidth: this.sloganwidth
    });

    this.element.showcase = new Showcase({
      game: this.game,
      img: 'img/surtido-lanjaron.png',
      slot: {
        x: [0, 292, 614, 924, 1285, 1626, 1993, 2368, 2741],
        y: [0, 500]
      }
    });

    this.container.addChild(this.element.slogan.container);
    this.container.addChild(this.element.showcase.container);
    
    this.element.slogan.container.y = this.game.sceneH * .2;

    this.resize();
  }

  pan() {

    super.pan();

    let sloganpanspace = this.game.sceneW / 100 * (100 - this.margin * 2 - this.sloganwidth);
    let sloganmargin = this.game.sceneW / 100 * this.margin;
    this.element.slogan.container.x = sloganmargin + sloganpanspace * this.position.x / this.game.sceneW;

    let showcasepanspace = this.game.sceneW - this.element.showcase.container.width;
    this.element.showcase.container.x = showcasepanspace * this.position.x / this.game.sceneW;
  }

  resize() { 

    super.resize();
  }

  remove() {}
}