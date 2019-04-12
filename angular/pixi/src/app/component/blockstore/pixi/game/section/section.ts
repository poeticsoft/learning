
import * as PIXI from 'pixi.js/dist/pixi.js';
import * as TWEEN from '@tweenjs/tween.js';

import BGText from '../element/bgtext';

export default class Section {

  game: any;
  name: string;
  index: any;
  container: any;
  element: any = {};
  position: any;
  oscilator: any = {
    index: 0,
    x: 0,
    y: 0
  };
  pansubscriber: any;
  resizesubscriber: any;

  constructor(config) {

    this.game = config.game;
    this.name = config.name;
    this.index = config.index
  }

  /* PUBLIC */

  createSection() {
    
    this.container = new PIXI.Container();
    this.container.name = this.name;
    this.container.alpha = 0;

    // position marker
 
    this.position = new PIXI.Graphics();            
    this.position.beginFill(0xFF0000);
    this.position.drawRect(-10, 0, 10, 10 );
    this.position.endFill();  
    this.position.name = 'POSITION';
    this.container.addChild(this.position);

    // Section container

    this.game.stage.sections.addChild(this.container);

    // events

    this.pansubscriber = this.game.panemitter.subscribe(this.pan.bind(this));
    this.resizesubscriber = this.game.resizeemitter.subscribe(this.resize.bind(this));
  }

  pan() {

    this.position.x = -(this.game.interaction.x + 
                       this.game.interaction.sectionpanspace.x * this.index.col) /
                       this.game.interaction.sectionpanspace.mult;
  }

  resize() {

    this.pan();
  }

  /* Start & stop section */

  // in > fadein > action

  in() {

    this.createSection();

    new TWEEN.Tween(this.container)
              .to({ alpha: 1 }, 1000)
              .easing(TWEEN.Easing.Quartic.In)
              .onComplete(this.action.bind(this))
              .start();
  }

  action() {};

  clearSection() {

    this.pansubscriber.unsubscribe();
    this.resizesubscriber.unsubscribe();

    Object.keys(this.element)
    .forEach(key =>  {

      this.element[key].remove();
    });

    this.container.destroy({
      children: true
    });
  }

  out() {
    
    this.cut();
  }

  cut() {

    new TWEEN.Tween(this.container)
             .to({ alpha: 0 }, 1000)
             .easing(TWEEN.Easing.Quartic.In)
             .onComplete(this.clearSection.bind(this))
             .start();
  }
}

// http://tweenjs.github.io/tween.js/examples/03_graphs.html