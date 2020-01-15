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

  // isChannelPrivate(channelName: string) {
  //   this.channelPasswordService.isChannelPrivate(channelName)
  //     .then(response => { if (response.data().password) this.promptUserForPassword() })
  //     .catch(error => console.log('=== error:', error));
  // }

  // promptUserForPassword() {
  //   console.log('=== PROMPT user for password')
  // }
}
