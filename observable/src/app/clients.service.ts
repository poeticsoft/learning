import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  
  clients$ = new Subject<Client[]>();
  clients: Client[] = [];

  constructor() { }

  addClient(client: Client) {

    this.clients.push(client);
    this.clients$.next(this.clients);
  }

  observeClients$(): Observable<Client[]> {

    return this.clients$.asObservable();
  }
}
