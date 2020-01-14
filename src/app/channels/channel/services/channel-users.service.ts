import { Injectable } from '@angular/core';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from '@firebase/app';
import '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChannelUsersService {

  constructor(private firestore: AngularFirestore) { }

  // Add a user to the list of current chatroom users
  addANewUser(userName: string, channelName: string) {
    return this.firestore.firestore.collection('channels').doc(channelName).update(
      {
        users: firebase.firestore.FieldValue.arrayUnion(userName)
      }
    )
  }
  
  // Remove a user from the list of current chatroom users
  removeAUser(userName: string, channelName: string) {
    console.log('=== userName:', userName)
    console.log('=== channelName:', channelName)
    return this.firestore.firestore.collection('channels').doc(channelName).update(
      {
        users: firebase.firestore.FieldValue.arrayRemove(userName)
      }
    )
  }
}
