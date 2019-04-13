
import * as PIXI from 'pixi.js';
import * as TWEEN from '@tweenjs/tween.js';

import Element from './element';

class MapPoint {

  container: any;

  constructor(config) {

    this.container = new PIXI.Container();

    let point = new PIXI.Graphics();
    point.name = 'CIRCLE';
    point.beginFill(0x000000, 0.5)
          .drawCircle(
            0,
            0,
            20
          )
          .endFill();

    let index = new PIXI.Text(
                      config.index || 0, 
                      config.game.style.text('mappointindex')
                    );
    index.name = 'INDEX';

    let text = new PIXI.Text(
                      config.data.title || 0, 
                      config.game.style.text('mappointindex')
                    );
    text.name = 'TEXT';

    this.container.addChild(point);
    this.container.addChild(index);
    this.container.addChild(text);
  }
}

export default class MapElement extends Element {

  points: any[] = [];
  shadow: any;
  mapcontainer: any;
  mapimage: any;
  mask: any;
  scale: number;
  pressed: boolean = false;
  reference: any = {
    x: 0,
    y: 0
  };
  deltafriction: number = 0.95;
  deltareducer: number = 10;
  interaction: any = {
    x: 0, // Absolute position
    y: 0,
    delta:{
      x: 0, // increment
      y: 0
    }
  };
  tickerlistener: any;

  constructor(config) {

    super(config); 

    let blur = new PIXI.filters.BlurFilter();
    this.mapcontainer = new PIXI.Container();
    this.mapcontainer.name = 'MAP';
    this.mask = new PIXI.Graphics();
    this.mask.name = 'MASK';
    this.shadow = new PIXI.Graphics();
    this.shadow.name = 'SHADOW';
    this.shadow.filters = [blur];

    this.mapcontainer.mask = this.mask;        

    this.points = config.points;    
    this.container.name = 'MAP';
    this.points.forEach(
      (point, index) => {

        point.mappoint = new MapPoint({
          game: this.game,
          index: index,
          data: point
        });

        point.mappoint.container.x = point.position.x * config.scale;
        point.mappoint.container.y = point.position.y * config.scale;
      }
    );

    config.game.texture.load(config.mapimage)
    .then(
      () => {

        let mapimagetexture =  config.game.texture.get(config.mapimage);
        this.mapimage = new PIXI.Sprite(mapimagetexture);
        this.mapimage.scale.x = 
        this.mapimage.scale.y = config.scale;
        this.mapcontainer.addChild(this.mapimage);

        this.points.forEach(

          point => {

            this.mapcontainer.addChild(point.mappoint.container);
          }
        );

        this.container.addChild(this.shadow);
        this.container.addChild(this.mapcontainer);
        this.container.addChild(this.mask);

        this.setlayout();

        this.tickerlistener = this.game.tickeremitter.subscribe(this._track.bind(this));
      }
    );

    this.mask.interactive = true;

    this.mask
        .on('pointerdown', this._panStart.bind(this))
        .on('pointerup', this._panEnd.bind(this))
        .on('pointerupoutside', this._panEnd.bind(this))
        .on('pointermove', this._onPanMove.bind(this));

    /*

    setTimeout(() => {

      new TWEEN.Tween(this.point)
                .to({
                   x: [100, 200, 300, 400, 500],
                   y: [100, 0, 200, 0, 100]
                }, 2000)
                .interpolation(TWEEN.Interpolation.CatmullRom)
                .start();
    }, 1000);
    */

  }

  /* PRIVATE */

  private _panStart(E) {

    this.pressed = true;
    this.reference.x = E.data.global.x; 
    this.reference.y = E.data.global.y;
    
    E.stopPropagation();
  }

  private _panEnd(E) {

    this.pressed = false;

    E.stopPropagation();
  }

  private _onPanMove(E) {

    if(!this.pressed) { return; }

    this.interaction.delta.x = E.data.global.x - this.reference.x;
    this.interaction.delta.y = E.data.global.y - this.reference.y;

    E.stopPropagation();
  }

  private _track(elapsed) {


    if(!this.pressed) { 

      this.interaction.delta.x *= this.deltafriction;
      this.interaction.delta.y *= this.deltafriction; 
    }

    if(
      this.interaction.delta.x < -1 || 
      this.interaction.delta.x > 1 ||
      this.interaction.delta.y < -1 ||
      this.interaction.delta.y > 1
    ) { 

      // Rest position = -1 <--> 1

      this.interaction.x += this.interaction.delta.x / this.deltareducer;
      this.interaction.y += this.interaction.delta.y / this.deltareducer;

      // Bounds

      if(this.interaction.x > 0) { this.interaction.x = this.interaction.delta.x; }
      if(this.interaction.y > 0) { this.interaction.y = this.interaction.delta.y; }

      if(this.interaction.x < -this.mapcontainer.width) { this.interaction.x = -this.mapcontainer.width + this.interaction.delta.x; }
      if(this.interaction.y < -this.mapcontainer.height) { this.interaction.y = -this.mapcontainer.height + this.interaction.delta.y; }

      this.mapcontainer.x = this.interaction.x;
      this.mapcontainer.y = this.interaction.y;
    }
  }

  /* PUBLIC */

  setlayout() {

    let newW = this.game.sceneW - this.game.margin * 2;
    let newH = this.game.sceneH - this.game.margin * 2;

    this.mask
        .clear()
        .beginFill(0xffffff, 0.5)
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
        .beginFill(0x000000, 0.5)
        .drawRoundedRect(
          this.game.margin - 5,
          this.game.margin -5,
          newW + 10,
          newH + 10,
          this.game.roundframe + 5
        )
        .endFill();
  }

  remove() {

    // this.tweengroup.removeAll();
    this.tickerlistener.unsubscribe();

    super.remove();
  }
}