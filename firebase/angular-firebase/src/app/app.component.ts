import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';

// https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  products: Observable<any[]>;

  constructor(db: AngularFirestore) {

    this.products = db.collection('products').valueChanges();
  }
}
