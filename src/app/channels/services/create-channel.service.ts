import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

// RxJS
import { Observable } from 'rxjs';

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
    private http: HttpClient,
  ) { }

  onCreateChannel(form: NgForm): Promise<any> {
    const newChannel: ChannelData = {
      messages: {},
      name: form.value.channelName,
      users: [],
    }

    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('channels')
        .add(newChannel)
        .then(
          resolve => console.log('=== resolve:', resolve),
          error => console.log('=== error:', error)
        );
    });
  }
}