import {
	Component,
	ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'pixi',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  host: {'class': 'view'},
  encapsulation: ViewEncapsulation.None
})
export class PixiViewComponent {

  constructor() { }
}
