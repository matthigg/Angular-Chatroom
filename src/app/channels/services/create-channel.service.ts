import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

// Interfaces
import { ChannelData } from '../models/channel-data';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CreateChannelService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  onCreateChannel(form: NgForm): Promise<any> {
    const newChannel: ChannelData = {
      messages: {},
      name: form.value.channelName,
      users: [],
    }

    return this.firestore
      .collection('channels')
      .add(newChannel);
  }
}