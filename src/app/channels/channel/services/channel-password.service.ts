import { Injectable } from '@angular/core';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from '@firebase/app';
import '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChannelPasswordService {

  constructor(private firestore: AngularFirestore) { }

  async isChannelPrivate(channelName: string) {
    return await this.firestore.firestore.collection('channels').doc(channelName).get()
  }
}
