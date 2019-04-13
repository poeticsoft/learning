
import * as PIXI from 'pixi.js/dist/pixi.js';

export default class Scene {

  game: any;	
  panemitter: any;
  resizeemitter: any;

  constructor(config) {

    this.game = config.game;
  }

  /* PUBLIC */

  pan() {}

  resize() {}
}