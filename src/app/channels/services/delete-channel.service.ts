import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RxJS
import { Observable } from 'rxjs';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DeleteChannelService {

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient
  ) { }

  onDeleteChannel(channelId: string) {
    // return this.http.delete(
    //   `https://angular-chatroom-78cb6.firebaseio.com/channels/${channelId}.json`,
    // );

    return this.firestore
      .collection('channels')
      .doc(channelId)
      .delete();
  }
}