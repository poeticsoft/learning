import {
	Component,
	ViewEncapsulation 
} from '@angular/core';

@Component({
  selector: 'block-base',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlockBaseComponent {

  constructor() { }
}
