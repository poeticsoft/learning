
import { Component } from '@angular/core';
import { 
  Observable,
  Subscription,
  interval
} from 'rxjs';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

// https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md
// https://firebase.google.com/docs/auth/web/manage-users?hl=es-419

interface Product { 
  ProductName: string; 
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public productsCollection: AngularFirestoreCollection<Product>;
  public productsSubscription: Subscription;
  public products: Product[] = [];
  public UserLoged: boolean = false;

  constructor(
    public afs: AngularFirestore,
    public afa: AngularFireAuth
  ) {

    this.afa.auth.onAuthStateChanged(this.userStateChanged.bind(this));
    this.productsCollection = afs.collection('products');
  }

  setProducts(Products) {

    this.products = Products;
  }

  addProduct() {

    this.productsCollection.add({
      ProductName: 'Name ?'
    });
  }

  userStateChanged(user) {

    if (user) {

      this.UserLoged = true;

      this.productsSubscription = this.productsCollection.valueChanges()
      .subscribe(this.setProducts.bind(this));

    } else {

      this.UserLoged = false;

      if(this.productsSubscription)
        this.productsSubscription.unsubscribe();
    }
  }

  login() {

    this.afa.auth.signInWithEmailAndPassword(
      'alberto.moral@poeticsoft.com',
      'JsAU8)0000'
    ).catch(function(Error) {
      
      console.log(Error);
    });
  }

  logout() {

    this.afa.auth.signOut()
    .then(() => { })
    .catch(() => { });
  }
}
