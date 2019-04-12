
import * as PIXI from 'pixi.js/dist/pixi.js';
import * as TWEEN from '@tweenjs/tween.js';

import Element from './element';
import ResponsiveBGText from './responsivebgtext';

export default class VideoElement extends Element {

  public player: any;

  videocontainer: any;
  videosprite: any;
  format: any = {
    w: 0,
    h: 0
  };
  mask: any;
  shadow: any;
  text: any[];
  center: any = {
    x: 0,
    y: 0
  };
  tweengroup: any = new TWEEN.Group();
  tickerlistener: any;

  constructor(config) {

    super(config);
    
    this.container.name = 'VIDEO';
    this.text = config.text;

    this.game.texture.load(config.file)
    .then(
      () => {

        this.videocontainer = new PIXI.Container();
        this.videocontainer.name = 'VIDEOCONTAINER';
        this.videocontainer.x = 
        this.videocontainer.y = this.game.margin;

        let videotexture = this.game.texture.get(config.file);
        this.player = videotexture.baseTexture.source;
        this.player.addEventListener(
          'timeupdate',
          this._videoTimeUpdate.bind(this)
        );
        this.format = {
          w: videotexture.orig.width,
          h: videotexture.orig.height
        };
        this.videosprite = new PIXI.Sprite(videotexture);         
        this.videosprite.name = 'VIDEO';
        this.videocontainer.addChild(this.videosprite);
        let blur = new PIXI.filters.BlurFilter();
        this.mask = new PIXI.Graphics();
        this.mask.name = 'MASK';
        this.shadow = new PIXI.Graphics();
        this.shadow.name = 'SHADOW';
        this.shadow.filters = [blur];

        this.container.addChild(this.shadow);
        this.container.addChild(this.videocontainer);
        this.container.addChild(this.mask);   

        this.videocontainer.mask = this.mask;

        this.text.forEach(
          text => {

            text.ptext = new ResponsiveBGText({
              game: this.game,
              text: text.text
            });

            this.container.addChild(text.ptext.container);  
          }
        );

        this.tickerlistener = this.game.tickeremitter.subscribe(this._animate.bind(this));

        this.setlayout();

        if(config.cb) { config.cb(); }
      }
    )
  }

  /* PRIVATE */

  private _videoTimeUpdate() {

    let actualtime = this.player.currentTime;

    this.text
    .forEach(
      (text, index) => {

        if(actualtime >= text.in && 
           actualtime <= text.out) {

          if(!text.visible) {

            new TWEEN.Tween(text.ptext.container)
                      .group(this.tweengroup)
                      .to({ alpha: 1, x: this.center.x, y: this.center.y }, 500)
                      .onComplete(() => text.visible = true)
                      .start();
          }
        } else {

          if(text.visible) {

            new TWEEN.Tween(text.ptext.container)
                      .group(this.tweengroup)
                      .to({ alpha: 0, x: 0, y: 0 }, 500)
                      .onComplete(() => text.visible = false)
                      .start();
          }
        }
      }
    );
  }

  private _animate() {

    this.tweengroup.update();
  }

  /* PUBLIC */

  setlayout() { // TODO ADAPT

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

    this.game.style.covercontainer({
      game: this.game,
      format: this.format,
      containerdimensions: {
        w: newW,
        h: newH
      },
      content: this.videosprite,
      relposition: {
        x: 2,
        y: 2
      }
    });

    this.text.forEach(
      text => {

        text.ptext.setlayout(); 
      }
    );

    this.center.x = this.game.sceneW / 2;
    this.center.y = this.game.sceneH / 2;
  }

  remove() {

    this.tickerlistener.unsubscribe();
    this.player.pause();
    this.player.removeEventListener(
          'timeupdate',
          this._videoTimeUpdate.bind(this)
        );
    this.tweengroup.removeAll();
    super.remove();
  }
}