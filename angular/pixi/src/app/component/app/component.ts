import { 
	Component,
	ViewEncapsulation 
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';
}
