
import * as PIXI from 'pixi.js/dist/pixi.js';

import Element from './element';

export default class ResponsiveBGText extends Element {

  rwidth: number;
  rmargin: number;
  content: any;
  background: any;

  style: any;

  constructor(config) {

    super(config);
    
    this.container.name = 'RESPONSIVEBGTEXT';
    this.container.alpha = config.visible ? 1 : 0;

    let stylename = config.styleName || 'whitetitle';
    let text = config.text || 'RESPONSIVE\nTEXT ';
    let backgroundcolor = config.backgroundColor || 0x000000;

    this.rwidth = config.rwidth || 50;
    this.rmargin = config.rmargin || 2;

    let style = this.game.style.text(stylename);
    this.content = new PIXI.Text(text, style);

    this.background = new PIXI.Graphics();            
    this.background.beginFill(backgroundcolor);
    this.background.drawRect(0, 0, 1, 1);
    this.background.endFill();

    this.container.addChild(this.background);
    this.container.addChild(this.content);

    this.setlayout();
  }

  setlayout() {

    let r = Math.max(this.game.sceneW, 320) / 100;
    let margin = this.rmargin * r;
    let width = this.rwidth * r;
    let wordWrapWidth = width - margin * 4;

    this.background.width = width;    
    this.content.style.wordWrapWidth = wordWrapWidth;

    let adjust = () => {

      if(Math.abs(wordWrapWidth - this.content.width) > margin) {

        this.content.style.fontSize += (wordWrapWidth > this.content.width) ? 1 : -1;

        setTimeout(adjust.bind(this), 10);
      }
    }

    adjust();

    this.background.height = this.content.height + margin * 2;
    this.content.x = margin * 2
    this.content.y = margin;
  }
}