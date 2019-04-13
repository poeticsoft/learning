
import * as PIXI from 'pixi.js/dist/pixi.js';

import Section from './section';
import VideoElement from '../element/video';

export default class Video extends Section {

  constructor(config) {

    super(config);
  }

  createSection() {

    super.createSection();
  
    this.element.video = new VideoElement({
        game: this.game,
        file: 'video/car-c.mp4',
        text: [
          {
            id: 0,
            in: 0,
            out: 0.9,
            text: 'PRIMER TEXTO',
            ptext: null,
            visible: false 
          },
          {
            id: 1,
            in: 1,
            out: 1.8,
            text: 'SEGUNDO TEXTO',
            ptext: null,
            visible: false 
          }
        ],
        cb: this._videoready.bind(this)
    });

    this.container.addChild(this.element.video.container);
  }

  /* PRIVATE */

  private _videoready() {

    // this.resize();

    this.element.video.player.play();
  }

  /* PUBLIC */

  resize() {

    super.resize();

    this.element.video.setlayout();
  }
}