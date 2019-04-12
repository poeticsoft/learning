

import * as PIXI from 'pixi.js';

export default class Element {

  game: any;
  container: any;
  pansubscriber: any;
  resizesubscriber: any;

  constructor(config) {

    this.game = config.game;
    this.container = new PIXI.Container();
  }

  remove() {

  	this.container.destroy();
  };
}