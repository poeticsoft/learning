import { 
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'nav',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None  
})
export class NavComponent {

  constructor() { }

  navTo($event) {

  	console.log($event);

  	return false;
  }
}
