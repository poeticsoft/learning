
import * as PIXI from 'pixi.js';

import Scene from './scene';

export default class Parallax extends Scene {

  stage: any = {};
  scenario: any = {
    fonvella: {
      backImage: 'img/fontvella-mountains.jpg',
      midImage: 'img/clouds-a.png',
      frontImage: 'img/clouds-b.png'
    },
    lanjaron: {
      backImage: 'img/lanjaron-mountains-sky.jpg',
      midImage: 'img/lanjaron-mountains-mountains.png',
      frontImage: 'img/clouds-a.png'
    }
  }

  constructor(config) {

    super(config);

    let sceneImages = this.scenario[config.scenario];

    this.stage.bar = new PIXI.Graphics();
    this.stage.bar.name = 'BAR';  
    this.game.sectionmatrix
    .forEach(
      (section, index) => { 

        let color = index % 2 ? 0xffffff : 0xcccccc;
        this.stage.bar.beginFill(color);
        this.stage.bar.drawRect(index * 4, 0, 4, 4 );
        this.stage.bar.endFill();
      }
    ) 
    this.stage.barposition = new PIXI.Graphics();            
    this.stage.barposition.beginFill(0xFF0000);
    this.stage.barposition.drawRect(-4, 0, 8, 1 );
    this.stage.barposition.endFill();  
    this.stage.barposition.name = 'BARPOSITION';

    Promise.all([
      this.game.texture.load(sceneImages.backImage),
      this.game.texture.load(sceneImages.midImage),
      this.game.texture.load(sceneImages.frontImage)
    ])
    .then(
      (textures) => {

        this.stage.back = new PIXI.extras.TilingSprite(this.game.texture.get(sceneImages.backImage));
        this.stage.back.name = 'BACK';       
        this.stage.mid = new PIXI.extras.TilingSprite(this.game.texture.get(sceneImages.midImage));   
        this.stage.mid.name = 'MIDDLE';        
        this.stage.front = new PIXI.extras.TilingSprite(this.game.texture.get(sceneImages.frontImage));
        this.stage.front.name = 'FRONT';

        this.stage.bar.width =      
        this.stage.front.width =
        this.stage.mid.width = 
        this.stage.back.width = 100;

        this.stage.front.height =
        this.stage.mid.height =  
        this.stage.back.height = this.game.sceneH;

        config.game.app.stage.addChild(this.stage.back);
        config.game.app.stage.addChild(this.stage.mid);
        config.game.app.stage.addChild(config.game.stage.sections);
        config.game.app.stage.addChild(this.stage.front);
        config.game.app.stage.addChild(this.stage.bar);
        config.game.app.stage.addChild(this.stage.barposition);

        this.game.tickeremitter.subscribe(this._ticker.bind(this));

        // events

        this.game.panemitter.subscribe(this.pan.bind(this));
        this.game.resizeemitter.subscribe(this.resize.bind(this));

        this.resize();
        this.pan();
      },
      (error) => {

        console.log(error);
      }
    );
  }

  /* PRIVATE */

  private _ticker(delta) {

    this.stage.back.tilePosition.x += this.game.oscilator.x / 10;
    this.stage.mid.tilePosition.x += this.game.oscilator.x / 10;
    this.stage.front.tilePosition.x += this.game.oscilator.x / 10;
  }

  /* PUBLIC */

  pan() {

    this.stage.back.tilePosition.x = this.game.interaction.x * 1;
    this.stage.mid.tilePosition.x = this.game.interaction.x * 2;
    this.stage.front.tilePosition.x = this.game.interaction.x * 3;

    this.stage.barposition.x = -this.game.interaction.x / this.game.interaction.maxpanscene.x * this.game.sceneW;
  }

  resize() {

    this.stage.back.width =
    this.stage.mid.width =
    this.stage.front.width = 
    this.stage.bar.width = this.game.sceneW;

    this.stage.bar.height = 
    this.stage.barposition.height = this.game.sceneH / 100;

    this.stage.bar.y = 
    this.stage.barposition.y = this.game.sceneH - this.game.sceneH / 100;
  }
}