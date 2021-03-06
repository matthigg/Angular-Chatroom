import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

// RxJS
import { take } from 'rxjs/operators';

// Services
import { AuthService } from '../../auth/services/auth.service';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CreateChannelService {
  userName: string;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore
  ) { }

  onCreateChannel(form: NgForm): Promise<any> {

    // Grab the current user name
    this.authService.user
      .pipe(take(1))
      .subscribe(user => { this.userName = user.name });

    // Create a subcollection to store channel meta data
    return this.onCreateChannelMetaData(form)

      // Create a new channel with an initial 'System' message
      .then(response => {
        this.firestore
        .collection('channels')
        .doc(form.value.channelName)
        .set(
          {
            messages: [
              { 
                user: 'System',
                time: new Date(),
                message: `Channel ${form.value.channelName} has been created.`,
              }
            ],
          }
        )
      })

      // Initialize an empty channel user list
      .then(response => {
        return this.onCreateChannelUsersList(form.value.channelName);
      })
  }

  // Create a subcollection to store channel meta data, ie. creator, permissions
  onCreateChannelMetaData(form: NgForm): Promise<any> {
    return this.firestore
      .collection('channels')
      .doc(form.value.channelName)
      .collection('metaData')
      .doc('metaData')
      .set(
        { 
          creator: this.userName,
          permission: form.value.permission,
        }
      );
  }

  // Create a channel password for private channels
  onCreateChannelPassword(form: NgForm): Promise<any> {
    return this.firestore
      .collection('channels')
      .doc(form.value.channelName)
      .collection('credentials')
      .doc('password')
      .set({ password: form.value.password });
  }

  // Create a new channel's user list
  onCreateChannelUsersList(channelName: string): Promise<any> {
    return this.firestore
      .collection('channels')
      .doc(channelName)
      .collection('users')
      .doc('users')
      .set({ users: [] });
  }
}