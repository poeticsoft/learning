
// https://medium.com/@mohandere/rxjs-5-in-5-minutes-1c3b4ed0d8cc
// https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
// https://www.learnrxjs.io/operators/

import { 
  Component
} from '@angular/core';
import { 
  Observable
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {

  emitter$: Observable<number> = Observable.create(observer => observer.next(2));

  listenerA: any = (D) => {

    console.log('A ' + D);
  }

  listenerB: any = (D) => {

    console.log('B ' + D);
  }

  constructor() {

    this.emitter$.subscribe(this.listenerA);
    this.emitter$.subscribe(this.listenerB);
  }  
}
