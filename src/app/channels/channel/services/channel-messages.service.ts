import { Injectable } from '@angular/core';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChannelMessagesService {

  constructor(private firestore: AngularFirestore) { }

  addANewMessage(userName: string, message: string) {
    // POST request to Firestore
  }

  retrieveMessages(channelName: string): Promise<any> {
    return this.firestore.firestore.collection('channels').doc(channelName).get()
  }
}
