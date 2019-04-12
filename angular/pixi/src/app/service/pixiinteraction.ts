
  import * as PIXI from 'pixi.js/dist/pixi.js';

  import { Injectable } from '@angular/core';

  class PanInertia {

    game: any;

    pressed: boolean = false;
    reference: any = {
      x: 0,
      y: 0
    };
    deltafriction: number = 0.95;
    deltareducer: number = 10;

    constructor(config) {

      this.game = config.game;
      this.game.app.stage.interactive = true;

      this.game.app.stage
                .on('pointerdown', this._panStart.bind(this))
                .on('pointerup', this._panEnd.bind(this))
                .on('pointerupoutside', this._panEnd.bind(this))
                .on('pointermove', this._onPanMove.bind(this));
    }

    /* PRIVATE */

    private _panStart(E) {

      this.pressed = true;
      this.reference.x = E.data.global.x; 
      this.reference.y = E.data.global.y;
    }

    private _panEnd(E) {

      this.pressed = false;
    }

    private _onPanMove(E) {

      if(!this.pressed) { return; }

      this.game.interaction.delta.x = E.data.global.x - this.reference.x;
      this.game.interaction.delta.y = E.data.global.y - this.reference.y;
    }

    /* PUBLIC */

    track(elapsed) { // from app ticker 

      // Inertia   

      if(!this.pressed) { 

        this.game.interaction.delta.x *= this.deltafriction;
        this.game.interaction.delta.y *= this.deltafriction; 
      }

      if(
        this.game.interaction.delta.x < -1 || 
        this.game.interaction.delta.x > 1 ||
        this.game.interaction.delta.y < -1 ||
        this.game.interaction.delta.y > 1
      ) { 

        // Rest position = -1 <--> 1

        this.game.interaction.x += this.game.interaction.delta.x / this.deltareducer;
        this.game.interaction.y += this.game.interaction.delta.y / this.deltareducer;

        // Bounds

        if(this.game.interaction.x > 0) { this.game.interaction.x = this.game.interaction.delta.x; }
        if(this.game.interaction.y > 0) { this.game.interaction.y = this.game.interaction.delta.y; }

        if(this.game.interaction.x < -this.game.interaction.maxpanscene.x) { this.game.interaction.x = -this.game.interaction.maxpanscene.x + this.game.interaction.delta.x; }
        if(this.game.interaction.y < -this.game.interaction.maxpanscene.y) { this.game.interaction.y = -this.game.interaction.maxpanscene.y + this.game.interaction.delta.y; }

        this.game.pan(); 
      }
    }
  }

  @Injectable()
  export class PixiInteractionService {

    /* required declared in game !!!    
    interaction: any; interaction data
    */

    interaction: any = {
      paninertia: PanInertia
      // http://jsbin.com/nubutodosu/edit?js,output for gaussian curve
    }

    constructor() {

    }

    get(config) {

      return new this.interaction[config.type](config);
    }
  }
