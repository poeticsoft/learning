
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
  id?: string,
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

  // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419
  
  addProduct() {

    /* FS generate ID */
    this.productsCollection.add({
      ProductName: 'Name ?'
    });
    
  }

  updateProduct($event, ID) {

    const NewName = $event.target.innerHTML.trim();
    const Product = this.products.find(P => {

      return P.id == ID;
    });

    console.log('|' + Product.ProductName.trim() + '| |' + NewName + '|');

    if(Product && (Product.ProductName.trim() != NewName)) {

      this.productsCollection.doc(ID)
      .set({
        ProductName: NewName
      })
      .then(() => {
  
        console.log('Set OK');
      })
      .catch(Error => {
  
        console.log('Set KO ' + Error);
      });
    }
  }

  userStateChanged(user) {

    if (user) {

      this.UserLoged = true;

      // https://github.com/angular/angularfire2/blob/7eb3e51022c7381dfc94ffb9e12555065f060639/docs/firestore/collections.md#example

      this.productsSubscription = this.productsCollection.snapshotChanges()
      .pipe(
        map(actions => {

          return actions.map(a => {

            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;

            return { id, ...data };
          });
        })
      )
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
