
// https://medium.com/@mohandere/rxjs-5-in-5-minutes-1c3b4ed0d8cc
// https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
// https://www.learnrxjs.io/operators/

import { 
  Component
} from '@angular/core';
import { 
  Observable, 
  Subject,
  interval,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {

  interval$: Observable<number>;
  subject$$: Subject<number>;
  
  constructor() {

    this.interval$ = interval(1000);
    this.subject$$ = new Subject();

    this.interval$.subscribe(D => console.log('A ' + D));
    // this.subject$$.subscribe(D => console.log('A ' + D));

    setTimeout(() => {

      this.interval$.subscribe(D => console.log('B ' + D));
      // this.subject$$.subscribe(D => console.log('B ' + D));
    }, 4000)

    // this.interval$.subscribe(this.subject$$);
  }
}
