import { 
  Component,
  ViewEncapsulation,
  ElementRef
} from '@angular/core';

import { ApiService } from '../../../service/api';
import { ResponsiveService } from '../../../service/responsive';
import { PixiStyleService } from '../../../service/pixistyle';
import { PixiInteractionService } from '../../../service/pixiinteraction';
import { PixiTextureService } from '../../../service/pixitexture';

// List of available games
import Rally from './game/rally'; // TODO multiple games

@Component({
  selector: 'block-pixi',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None  
})
export class BlockPixiComponent {

  // List of available games
  games: any = {
    rally: Rally
  };
  game: any;

  constructor(private el:ElementRef,
              private responsive: ResponsiveService,
              private api: ApiService,
              private style: PixiStyleService,
              private interactor: PixiInteractionService,
              private texture: PixiTextureService) {

    this.game = new this.games['rally']( // Dynamic assign
      this.el.nativeElement, 
      this.api,
      this.style,
      this.interactor,
      this.texture
    );

    this.responsive.resize.subscribe(this.game.resize.bind(this.game));
  }

  play() {

    this.game.play();
  }

  stop() {

    this.game.stop();
  }
}

// https://github.com/cursedcoder/awesome-pixijs
