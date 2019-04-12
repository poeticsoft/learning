
import * as PIXI from 'pixi.js/dist/pixi.js';
import * as TWEEN from '@tweenjs/tween.js';

import Section from './section';
import Position from '../element/position';
import Podium from '../element/podium';

export default class Cover extends Section {

  game: any;
  container: any;

  constructor(config) {

    super(config);
  }

  createSection() {

    super.createSection();
  
    this.element.podium = new Podium({
        game: this.game,
        users: [
          // /{ name: 'USER NAME 1' },
          // {  name: 'USER NAME 2' },
          { name: 'JOSE MANUEL GONZALEZ MARQUEZ' }
        ]
    });
    this.element.podium.container.scale.x =
    this.element.podium.container.scale.y = 0.5;

    this.container.addChild(this.element.podium.container);
  }
}