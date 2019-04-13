
import * as PIXI from 'pixi.js/dist/pixi.js';

import Section from './section';

import MapElement from '../element/map';

export default class Map extends Section {

  constructor(config) {

    super(config);
  }

  createSection() {

    super.createSection();

    this.element.map = new MapElement({
      game: this.game,
      mapimage: 'img/worldmap.jpg',
      scale: 1,
      points: [
        {
          title: 'TITLE',
          position: {
            x: 399,
            y: 439
          }
        },
        {
          title: 'TITLE',
          position: {
            x: 217,
            y: 415
          }
        },
        {
          title: 'TITLE',
          position: {
            x: 886,
            y: 331
          }
        }
      ]
    });

    this.container.addChild(this.element.map.container);
  }

  /* PRIVATE */

  /* PUBLIC */

  resize() {

    super.resize();

    this.element.map.setlayout();
  }
}