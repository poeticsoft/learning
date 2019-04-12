import { 
	Component,
	Input,
	ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'section-group',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None	
})
export class SectionGroupComponent {

  @Input() title: string;
  @Input() subtitle: string;

  constructor() { }
}
