// https://medium.com/@mohandere/rxjs-5-in-5-minutes-1c3b4ed0d8cc

import { 
  Component,
  ViewChild
} from '@angular/core';
import { 
  Observable, 
  Subscription,
  fromEvent,
  interval,
  pipe
} from 'rxjs';
import { filter } from 'rxjs/operators';
import { Client } from './client';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {

  @ViewChild('Emit') Emit;

  clients: Client[] = [];
  emitClick$: Observable<any>;
  clickSubscription: Subscription;
  clients$: Observable<Client[]>;
  clientsSuscription: Subscription;
  burst: Subscription;

  constructor(
    private clientsService: ClientsService
  ) {

  }

  /* Init observables & observes */

  ngOnInit() {

    this.emitClick$ = fromEvent(this.Emit.nativeElement, 'click');
    this.clickSubscription = this.emitClick$.subscribe(this.clickEmited);

    this.clients$ = this.clientsService.observeClients$();
    this.clientsSuscription = this.clients$.subscribe(this.clientsChange.bind(this));
  }

  /* Observable clients */

  clientsChange(clients: Client[]) {
    
    this.clients = clients;
  }  

  /* Observer click with object*/

  clickEmited = { // for observables as http fetch > others http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html
    next: (Event) => {
    
      console.log(this);
    },
    error: () => {


    },
    complete: () => {


    }
  };

  /* Clear subscription */

  ngOnDestroy() {

    this.clickSubscription.unsubscribe();
    this.clientsSuscription.unsubscribe();
  }

  /* Interface tools */

  addClient(D) {
    
    this.clientsService.addClient(new Client('C ' + (D || 'X')));
  }

  startBurst() {

    this.burst = interval(10)
    .pipe(
      filter((Index) => { return Index % 2 ? true : false; })
    )
    .subscribe(this.addClient.bind(this));
  }

  stopBurst() {

    this.burst.unsubscribe();
  }
}
