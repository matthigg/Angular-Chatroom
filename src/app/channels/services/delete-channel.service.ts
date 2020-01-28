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

    // Delete a channel's users list first
    return this.onDeleteChannelUsers(channelName)
      .then(response => { return this.onDeleteMetaData(channelName) })

      // If a channel has nested Firestore credentials, ie. the channel is private,
      // then delete the credentials before deleting the channel itself.
      .then(response => {
        if (channelPermission === 'private') {
          return this.onDeleteChannelCredentials(channelName)
            .then(response => {
              return this.firestore
                .collection('channels')
                .doc(channelName)
                .delete();
            })
            .catch(error => console.log('=== Error:', error));

        // Delete a public channel
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
      })
      .catch(error => console.log('=== Error:', error))
  }

  // Delete a channel's credentials/password
  onDeleteChannelCredentials(channelName: string): Promise<any> {
    return this.firestore
      .collection('channels')
      .doc(channelName)
      .collection('credentials')
      .doc('password')
      .delete();
  }

  // Delete a channel's meta data, ie. 'creator' and 'permission'
  onDeleteMetaData(channelName: string): Promise<any> {
    return this.firestore
      .collection('channels')
      .doc(channelName)
      .collection('metaData')
      .doc('metaData')
      .delete();
  }

  // Delete a channel's users list
  onDeleteChannelUsers(channelName: string): Promise<any> {
    return this.firestore
      .collection('channels')
      .doc(channelName)
      .collection('users')
      .doc('users')
      .delete();
  }
}