import {
	Component,
	Input,
	ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'section',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionComponent {

  @Input() title: string;
  @Input() subtitle: string;

  constructor() { }
}
