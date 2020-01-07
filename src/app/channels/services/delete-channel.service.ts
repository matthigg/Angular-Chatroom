import { Injectable } from '@angular/core';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DeleteChannelService {

  constructor(private firestore: AngularFirestore) { }

  onDeleteChannel(channelName: string): Promise<any> {
    return this.firestore
      .collection('channels')
      .doc(channelName)
      .delete();
  }
}