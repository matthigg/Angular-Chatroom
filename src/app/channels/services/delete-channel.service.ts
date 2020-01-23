import { Injectable } from '@angular/core';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DeleteChannelService {

  constructor(private firestore: AngularFirestore) { }

  onDeleteChannel(
    channelName: string,
    channelPermission: string,
    channelCreator: string,
  ): Promise<any> {
    if (channelPermission === 'private') {
      return this.onDeleteChannelCredentials(channelName)
        .then(response => {
          return this.firestore
            .collection('channels')
            .doc(channelName)
            .delete();
        })
        .catch(error => console.log('=== Error:', error));
    } else if (channelPermission === 'public') {
      return this.firestore
        .collection('channels')
        .doc(channelName)
        .delete();
    } else {
      return new Promise((resolve, reject) => {
        reject('=== Error: channel permission is neither public nor private.')
      });
    }
  }

  onDeleteChannelCredentials(channelName: string): Promise<any> {
    return this.firestore
      .collection('channels')
      .doc(channelName)
      .collection('credentials')
      .doc('password')
      .delete();
  }
}