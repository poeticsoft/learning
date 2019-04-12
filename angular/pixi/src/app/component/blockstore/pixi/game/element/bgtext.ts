
import * as PIXI from 'pixi.js/dist/pixi.js';

import Element from './element';

export default class BGText extends Element {

  content: any;
  background: any;

  constructor(config) {

    super(config);
    
    this.container.name = 'BGTEXT';

    let margin: number = 30;
    let stylename = config.styleName || 'whitetitle';
    let text = config.text || 'TEXT';
    let backgroundcolor = config.backgroundColor || 0x000000;
    let width = config.width || 300;
    let style = this.game.style.text[stylename];

    style.wordWrapWidth = config.width - margin * 2;

    this.container = new PIXI.Container();
    this.content = new PIXI.Text(text, style);
    this.content.x = margin;
    this.content.y = margin;
    this.background = new PIXI.Graphics();            
    this.background.beginFill(backgroundcolor);
    this.background.drawRect(
      0, 
      0, 
      width, 
      this.content.height + margin * 2
    );
    this.background.endFill();

    this.container.addChild(this.background);
    this.container.addChild(this.content);
  }
}