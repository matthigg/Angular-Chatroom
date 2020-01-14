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
    const channelName = form.value.channelName;
    const permission = form.value.permission;
    const password = form.value.password;
    this.authService.user
      .pipe(take(1))
      .subscribe(user => { this.userName = user.name });

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
          users: [],
          permission: permission,
          password: password,
          creator: this.userName,
        }
      );
  }
}