import { 
	Component,
	ViewEncapsulation
} from '@angular/core';

import { 
	style, 
	animate, 
	animation, 
	animateChild, 
	useAnimation, 
	group, 
	sequence, 
	transition, 
	state, 
	trigger, 
	query, 
	stagger 
} from '@angular/animations';

@Component({
  selector: 'block-playmotiv-anagrama',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
		trigger('animation', [
			transition('* => fadeIn', [
        		style({ strokeDashoffset: 0 }),
        		animate(5000, style({ strokeDashoffset: 371 }))
			]),
			transition('* => fadeOut', [
       			 animate(5000, style({ strokeDashoffset: 0 }))
			])
		])
	]
})
export class BlockPlaymotivAnagramaComponent {  
  
  animationVar = '';

  constructor() { }

  fadeIn() {

    this.animationVar = 'fadeIn';
  }

  fadeOut() {

    this.animationVar = 'fadeOut';
  }

  toggle() {

    this.animationVar == 'fadeOut' ? this.fadeIn() : this.fadeOut();
  }
}
