
import * as PIXI from 'pixi.js/dist/pixi.js';

import { Injectable } from '@angular/core';

@Injectable()
export class PixiStyleService {

  color: any = {
    blue: 0x0000ff
  };
  textStyle: any  = {
    podiumbadge: new PIXI.TextStyle({
      fontFamily: 'Raleway',
      fontWeight: '800',
      fontSize: 30,
      fill: ['#000000', '#cccccc', '#000000'],
      fillGradientType: PIXI.TEXT_GRADIENT.LINEAR_HORIZONTAL,
      fillGradientStops: [0, 0.3, 1]
    }),
    danoneslogan: new PIXI.TextStyle({
      fontFamily: 'ralewayblack',
      fontWeight: '800',
      fontSize: 30,
      fill: 0xffffff
    }),
    dev: new PIXI.TextStyle({
      fontSize: 18,
    }),
    whitetitle: new PIXI.TextStyle({
      fontFamily: 'campus',
      fontSize: 40,
      fontWeight: '800',
      fill: '#ffffff',
      wordWrap: true
    }),
    positionvalue: new PIXI.TextStyle({
      fontFamily: 'Fira Condensed',
      fontSize: 40,
      fontWeight: '800',
      fill: '#ffffff',
      wordWrap: true
    }),
    mappointindex: new PIXI.TextStyle({
      fontFamily: 'ralewayblack',
      fontSize: 50,
      fontWeight: '800',
      fill: '#ffffff',
      wordWrap: true
    }),
    mappointtext: new PIXI.TextStyle({
      fontFamily: 'ralewayblack',
      fontSize: 50,
      fontWeight: '800',
      fill: '#cccccc',
      wordWrap: true
    })
  };

  constructor() {}

  text(name) {

    return JSON.parse(JSON.stringify(this.textStyle[name]));
  }

  rgbtohex(rgb) { // Generator conversor

    let color = rgb || {
      r: Math.round(Math.random() * 256),
      g: Math.round(Math.random() * 256),
      b: Math.round(Math.random() * 256)
    };

    let hexcolor = PIXI.utils.rgb2hex([ // reduce to 1
      color.r / 255,
      color.g / 255,
      color.b / 255
    ]);

    return hexcolor;
  }

  covercontainer(context) {      

    /* game, format, containerdimensions, content */

    let contentW = (context.containerdimensions.w > context.format.w) ?
                                   context.containerdimensions.w
                                   :
                                   Math.max(
                                     context.containerdimensions.w * 
                                     context.format.w / 
                                     context.format.h, 
                                     context.containerdimensions.w
                                   );
    let contentH = contentW * context.format.h / context.format.w;

    if(contentH < context.containerdimensions.h) {

      contentH = context.containerdimensions.h;
      contentW = contentH * context.format.w / context.format.h;
    }

    context.content.scale.x =
    context.content.scale.y = contentW / context.format.w;
    context.content.x = Math.min(0, (context.containerdimensions.w - contentW) / context.relposition.x); // TODO BUG POSITIONING
    context.content.y = Math.max(0, (context.containerdimensions.h - contentH) / context.relposition.y);
  }
}
