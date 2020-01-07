import { Injectable } from '@angular/core';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChannelMessagesService {

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
