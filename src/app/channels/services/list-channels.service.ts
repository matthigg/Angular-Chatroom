import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListChannelsService {

  constructor(private firestore: AngularFirestore) { }

  // Return an observable that emits an event from the Firestore database to the 
  // client whenever the channels Firestore collection is updated
  onListAllChannels(): Observable<any> {
    return this.firestore
      .collection('channels')
      .snapshotChanges();
  }

  onGetChannelMetaData(channelName: string): Observable<any> {
    return this.firestore
      .collection('channels')
      .doc(channelName)
      .collection('metaData')
      .doc('metaData')
      .snapshotChanges();
  }
}
