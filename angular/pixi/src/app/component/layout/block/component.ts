import { 
	Component, 
	Input,
	ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'block',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlockComponent {

	@Input() type: string;

  constructor() { }
}
