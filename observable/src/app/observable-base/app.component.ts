
// https://medium.com/@mohandere/rxjs-5-in-5-minutes-1c3b4ed0d8cc
// https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
// https://www.learnrxjs.io/operators/

import { 
  Component,
  ViewChild
} from '@angular/core';
import { 
  Observable, 
  Subscription,
  fromEvent,
  interval,
  combineLatest, 
  merge
} from 'rxjs';
import { 
  filter,
  map,
  scan
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {

  @ViewChild('Emit') Emit;

  emitClick$: Observable<any>;
  clickSubscription: Subscription;

  burst$: Observable<any>;
  burstSubscription: Subscription;  

  combine$: Observable<any>;
  combineSubscription: Subscription;  

  constructor() {}

  ngOnInit() {

    this.emitClick$ = fromEvent(this.Emit.nativeElement, 'click')
    .pipe(
      map((E) => {

        return 1;
      }),
      scan((Acc, D) => {

        return Acc += D;
      })
    );
    this.clickSubscription = this.emitClick$.subscribe((D) => { console.log('emitClick > ' + D); });

    this.burst$ = interval(900)
    .pipe(
      filter((Index) => { return Index % 2 ? true : false; }),
      map(D => {

        return 'Burst ' + D;
      })
    );

    this.combine$ = merge(this.emitClick$, this.burst$);
    this.combineSubscription = this.combine$.subscribe(D => { console.log('merge > ' + D); });
  }

  startBurst() {

    console.clear();  

    this.burstSubscription = this.burst$.subscribe((D) => { console.log('burst > ' + D); });
  }

  stopBurst() {

    this.burstSubscription.unsubscribe();
  }
}
