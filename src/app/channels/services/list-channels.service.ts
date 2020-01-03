import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListChannelsService {

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient
  ) { }

  onListAllChannels() {
    return this.firestore.collection('channels').snapshotChanges();
  }
}
