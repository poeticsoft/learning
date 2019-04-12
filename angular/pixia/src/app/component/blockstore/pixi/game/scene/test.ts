
import * as PIXI from 'pixi.js';

import Scene from './scene';

export default class Test extends Scene {

	img: any;
	format: any = {
		w: 0,
		h: 0,
		ratio: 0
	};

  constructor(config) {

    super(config);

    this.game.texture.load('img/rally-a.jpg')
    .then(
      () => {

        this.img = new PIXI.Sprite(this.game.texture.get('img/rally-a.jpg'));
        this.img.name = 'IMAGE'; 
        this.format = {
        	w: this.img.width,
        	h: this.img.height,
          ratio: this.img.width / this.img.height
        };

        this.img.x = 0
        // this.img.pivot.x = 473;        
        this.img.y = 0
        // this.img.pivot.y = 410;

        this.game.app.stage.addChild(this.img);

        this.game.resizeemitter.subscribe(this.resize.bind(this));

        this.resize();
    	}
    );
  }

  /* PUBLIC */

  resize() {

    super.resize();

    this.img.width = (this.game.sceneW > this.format.w) ? 
    											this.game.sceneW
    											:
    											Math.max(this.game.sceneH * this.format.w / this.format.h, this.game.sceneW); 
		this.img.height = this.img.width * this.format.h / this.format.w;
		this.img.x = (this.game.sceneW - this.img.width) / 2; 
		this.img.y = (this.game.sceneH - this.img.height) / 2; 
  }
}