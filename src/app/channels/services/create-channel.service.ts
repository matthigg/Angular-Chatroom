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
              user: 'System',
              time: new Date(),
              message: `Channel ${channelName} has been created.`,
            }
          ],
          users: ['System'],
        }
      );
  }
}