import {
	Component,
	ViewEncapsulation
} from '@angular/core';

@Component({
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  host: {'class': 'view'},
  encapsulation: ViewEncapsulation.None
})
export class NoViewComponent {

  constructor() { }
}
