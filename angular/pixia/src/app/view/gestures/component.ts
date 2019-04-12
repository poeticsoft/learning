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
export class GesturesViewComponent { 

  type: string[] = [];
  delta: number = 0;
  velocity: number = 0;
  timer: any;
  
  constructor() { }

  gesture($event, type) {

    clearTimeout(this.timer);

    this.type.push(type);
  	this.type = ((a) => { return Array.from(new Set(a))})(this.type);
    this.delta = $event.deltaX;
    this.velocity = $event.velocityX;

    console.log($event);

    this.timer = setTimeout(
      () => {

         this.type = [];
      },
      2000
    )
  }
}

