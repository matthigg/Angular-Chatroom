import { Injectable } from '@angular/core';

// RxJS
import { BehaviorSubject, of } from 'rxjs';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

let mockChannelMessages = {
  channel1: [
    { 'user1': 'message 1'},
    { 'user2': 'message 2'},
    { 'user3': 'message 3'},
  ],
  channel2: [
    { 'user4': 'message 4'},
    { 'user5': 'message 5'},
    { 'user6': 'message 6'},
  ],
};

@Injectable({
  providedIn: 'root'
})
export class ChannelMessagesService {

  constructor(private firestore: AngularFirestore) { }

  retrieveMessages(channel) {
    
  }

  // return this.firestore.collection('channels').snapshotChanges();
}
