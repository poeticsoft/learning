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
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
		trigger('animation', [
			transition('* => grow', [
        		animate('1s', style({ 'stroke-dashoffset': 0 }))
			]),
			transition('* => shrink', [
       			animate('1s', style({ 'stroke-dashoffset': 1193.808 }))
			])
		])
	]
})
export class LabViewComponent {  
  
  animationVar = '';

  constructor() { }

  ngOnInit() {

  	this.toggle();
  }

  grow() {

    this.animationVar = 'grow';
  }

  shrink() {

    this.animationVar = 'shrink';
  }

  toggle() {

  	console.log('toggle');

    this.animationVar == 'grow' ? this.shrink() : this.grow();
  }
}

