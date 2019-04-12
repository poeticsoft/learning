
import * as PIXI from 'pixi.js';

import Element from './element';

class Badge {

  container: any;
  position: any = {
    x: 0,
    y: 0
  };

  constructor(game: any,
              position: number,
              badgeImg: string,
              userName: string) {

    this.container = new PIXI.Container();

    let badgeTexture = PIXI.Texture.fromImage(badgeImg);
    let style = game.style.text('podiumbadge');
    style.trim = true;
    let nameText = new PIXI.Text(
      userName,
      style
    );
    nameText.updateText(); // @types/pixi modified protected > public

    let badge = new PIXI.Sprite(badgeTexture);
    let radius: number = 120;
    let maxRopePoints: number = 50;
    let step = Math.PI / maxRopePoints;
    let ropePoints = maxRopePoints - Math.round( (nameText.texture.width / (radius * Math.PI)) * maxRopePoints );
    ropePoints /= 2;

    var points = [];
    for ( var i = maxRopePoints - ropePoints; i > ropePoints; i-- ) {
      var x = radius * Math.cos( step * i );
      var y = radius * Math.sin( step * i );
      points.push( new PIXI.Point( x, y ) );
    }
    let name = new PIXI.mesh.Rope(nameText.texture, points);
    name.x = 200;
    name.y = 200;

    this.container.addChild(badge);
    this.container.addChild(name);
  }
}

export default class Podium extends Element {

  stage: any = {};
  spring: number = 0.03;
  friction: number = 0.9;
  gravity: number = 2;
  threshold: number = 0.01;
  gpoint: any = {
    x: 250,
    y: 0
  };
  levels: number = 3;
  subscription: any;

  constructor(config) {

    super(config);
    
    this.container.name = 'PODIUM';

    config.users.forEach(
      (user, index) => {

        let i = this.levels - index;
        this.stage['badge' + i] = new Badge(
          this.game,
          i,
          'slotbadge-' + i + '.png',
          user.name
        );

        this.container.addChild(this.stage['badge' + i].container);
      }
    )
  } 

  private _move(
    badge,
    targetX,
    targetY
  ) {

    badge.vx += (targetX - badge.x) * this.spring;
    badge.vy += (targetY - badge.y) * this.spring;
    badge.vy += this.gravity;
    badge.vx *= this.friction;
    badge.vy *= this.friction;
    badge.x += badge.vx;
    badge.y += badge.vy;
  }
}