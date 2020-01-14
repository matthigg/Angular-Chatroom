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
export class ChannelMessagesService {
  activeChannel: BehaviorSubject<string> = new BehaviorSubject(null);
  userList: BehaviorSubject<string[]> = new BehaviorSubject(null);

  constructor(private firestore: AngularFirestore) { }

  // Add a chatroom message to Firestore
  addANewMessage(userName: string, channelName: string, message: string) {
    return this.firestore.firestore.collection('channels').doc(channelName).update(
      {
        messages: firebase.firestore.FieldValue.arrayUnion(
          {
            user: userName,
            time: new Date(),
            message: message,
          }
        )
      }
    )
  }

  // // Add a user to the list of current chatroom users
  // addANewUser(userName: string, channelName: string) {
  //   console.log('=== addANewUser() userName, channelName:', userName, channelName)
  //   return this.firestore.firestore.collection('channels').doc(channelName).update(
  //     {
  //       users: firebase.firestore.FieldValue.arrayUnion(userName)
  //     }
  //   )
  // }

  // // Remove a user from the list of current chatroom users
  // removeAUser(userName: string, channelName: string) {
  //   console.log('=== removeAUser() userName, channelName:', userName, channelName)
  //   return this.firestore.firestore.collection('channels').doc(channelName).update(
  //     {
  //       users: firebase.firestore.FieldValue.arrayRemove(userName)
  //     }
  //   )
  // }

  // Get chatroom messages & user list from Firestore
  retrieveMessages(channelName: string) {
    return this.firestore.firestore.collection('channels').doc(channelName)
  }
}
