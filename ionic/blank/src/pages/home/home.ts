import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any[] = [
    {
      id: 1,
      name: `Name 1`
    }
  ];

  constructor(public navCtrl: NavController) {

    this.initItems();
  }

  initItems() {

    var Ids: Array<number> = Array(20);

    this.items = Ids.map(I => {

      return {
        id: I,
        name: `Name ${I}`
      }
    });
  }
}
