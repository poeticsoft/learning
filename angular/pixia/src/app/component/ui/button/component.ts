import { 
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None  
})
export class UIButtonComponent {

  constructor() { }
}
