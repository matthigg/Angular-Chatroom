import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Services
import { AuthService } from '../services/auth.service';

// Models
import { User } from '../models/user.model';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {
  user: string;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.user = this.authService.user.getValue().name;
  }

  // Delete user from Firebase Authentication & Firestore
  onSubmit(form: NgForm) {
    console.log('=== form:', form.value.password)

    this.firestore.firestore
      .collection('accounts')
      .doc(firebase.auth().currentUser.uid)
      .delete()
      .then(response => {
        return firebase.auth().currentUser.delete()
      })
      .catch(error => console.log('=== Error:', error));
  }
}
