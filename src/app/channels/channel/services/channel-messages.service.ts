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
  activeChannel = new BehaviorSubject(null);

  constructor(private firestore: AngularFirestore) { }

  // POST chatroom messages to Firestore
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

  // GET chatroom messages from Firestore
  retrieveMessages(channelName: string) {
    return this.firestore.firestore.collection('channels').doc(channelName)
  }
}
