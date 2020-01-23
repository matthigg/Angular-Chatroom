import { Injectable } from '@angular/core';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListChannelsService {

  constructor(private firestore: AngularFirestore) { }

  // Return an observable that emits an event from the Firestore database to the 
  // client whenever the channels Firestore collection is updated
  onListAllChannels() {
    return this.firestore.collection('channels').snapshotChanges();
  }
}
