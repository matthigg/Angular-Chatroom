import { Injectable } from '@angular/core';

// RxJS
import { BehaviorSubject } from 'rxjs';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from '@firebase/app';
import '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChannelUsersService {
  userList: BehaviorSubject<string[]> = new BehaviorSubject(null);

  constructor(private firestore: AngularFirestore) { }

  // Add a user to the list of current chatroom users
  addANewUser(userName: string, channelName: string): Promise<void> {
    return this.firestore.firestore
      .collection('channels')
      .doc(channelName)
      .collection('users')
      .doc('users')
      .update({ users: firebase.firestore.FieldValue.arrayUnion(userName) })
  }
  
  // Remove a user from the list of current chatroom users
  removeAUser(userName: string, channelName: string) {
    return this.firestore.firestore
      .collection('channels')
      .doc(channelName)
      .collection('users')
      .doc('users')
      .update({ users: firebase.firestore.FieldValue.arrayRemove(userName) })
  }

  // Get chatroom users from Firestore
  retrieveUsers(channelName: string) {
    return this.firestore.firestore.collection('channels').doc(channelName).collection('users').doc('users')
  }
}
