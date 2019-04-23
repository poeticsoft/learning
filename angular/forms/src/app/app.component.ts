
import { Component } from '@angular/core';
import { 
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  profileForm = new FormGroup({
    firstName: new FormControl('firstName'),
    lastName: new FormControl('lastName'),
    address: new FormGroup({
      street: new FormControl('street'),
      city: new FormControl('city'),
      state: new FormControl('state'),
      zip: new FormControl('zip')
    })
  });

  onSubmit() {

    console.warn(this.profileForm.value);
  }
}
