import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CreateChannelService {

  constructor(private firestore: AngularFirestore) { }

  onCreateChannel(form: NgForm): Promise<any> {
    const channelName = form.value.channelName;

    return this.firestore
      .collection('channels')
      .doc(channelName)
      .set(
        {
          messages: [
            { 
              'user': 'test user 1',
              'message': 'test message 1',
              'time': new Date(),
            },
          ],
          users: ['test user 1', 'test user 2', 'test user 3'],
        }
      );
  }
}