import { Injectable } from '@angular/core';

// RxJS
import { BehaviorSubject } from 'rxjs';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthChannelService {
  authenticatedChannel = new BehaviorSubject<string>(null);
  channelIsPrivate = new BehaviorSubject<boolean>(false);

  constructor(private firestore: AngularFirestore) { }

  // Determine whether the channel is public or private
  // https://stackoverflow.com/questions/58776761/documentreference-getfield-not-working
  async isChannelPrivate(channelName: string): Promise<any> {
    return await this.firestore.firestore.collection('channels').doc(channelName).get()
      .then(documentSnapshot =>  { return documentSnapshot.get('permission') }) 
  }
}
