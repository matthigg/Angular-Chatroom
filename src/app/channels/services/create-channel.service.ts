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
    this.authService.user
      .pipe(take(1))
      .subscribe(user => { this.userName = user.name });

    return this.firestore
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
          users: [],
          permission: form.value.permission,
          creator: this.userName,
        }
      );
  }

  onCreateChannelPassword(form: NgForm): Promise<any> {
    console.log('=== PRIVATE ===');
    return this.firestore
      .collection('channels')
      .doc(form.value.channelName)
      .collection('credentials')
      .doc('password')
      .set({ password: form.value.password });
    // return new Promise((res, rej) => res('=== onCreateChannelPassword response ==='))
  }
}