import { Injectable } from '@angular/core';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChannelMessagesService {

  constructor(private firestore: AngularFirestore) { }

  retrieveMessages(channelName: string): Promise<any> {
    return this.firestore.firestore.collection('channels').doc(channelName).get()
  }
}
