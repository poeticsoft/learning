import {
	Component,
	ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  host: {'class': 'view'},
  encapsulation: ViewEncapsulation.None
})
export class MainViewComponent {

  constructor() { }
}
