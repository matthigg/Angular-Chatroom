import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthChannelService } from './services/auth-channel.service';
import { AuthService } from '../../auth/services/auth.service';
import { ChannelUsersService } from '../channel/services/channel-users.service';

// Models
import { User } from '../../auth/models/user.model';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

@Component({
  selector: 'app-auth-channel',
  templateUrl: './auth-channel.component.html',
  styleUrls: ['./auth-channel.component.scss']
})
export class AuthChannelComponent implements OnInit {
  channelName: string;
  channelIsPrivate: boolean = false;
  errorMessage: string;
  userName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authChannelService: AuthChannelService,
    private authService: AuthService,
    private channelUsersService: ChannelUsersService,
    private firestore: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit() {

    // Get user name
    this.authService.user.subscribe(
      (user: User) => user ? this.userName = user.name : this.userName = null,
      error => console.log('=== Error:', error)
    );

    // Get channel name from URL
    this.channelName = this.activatedRoute.snapshot.paramMap['params'].name;

    // Determine if channel is public or private
    this.authChannelService.isChannelPrivate(this.channelName)
      .then(response => {

        // If channel's permission is 'public' then automatically authenticate 
        // this channel (since it is public), halt loading this component, and 
        // navigate to the public channel
        if (response === 'public') {
          this.authChannelService.authenticatedChannel.next(this.channelName);
          this.authChannelService.channelIsPrivate.next(false)
          this.channelIsPrivate = false;
          this.router.navigate(['/channel', this.channelName]);

        // If the channel's permission is 'private', finish loading this component
        // in order to eventually prompt the user for a password
        } else if (response === 'private') {
          this.authChannelService.channelIsPrivate.next(true);
          this.channelIsPrivate = true;
        }
      })
      .catch(error => console.log('=== Error:', error));
  }

  // Handle channel password form submission
  onSubmit(form) {

    // Don't try to get the private channel password like this - directly
    // grabbing the password from the database is a security vulnerability
    // this.firestore.firestore.collection('channels').doc(this.channelName).get()
    //   .then(documentSnapshot => { documentSnapshot.get('password') })

    // Check that the submitted password is valid, attempt to add the current 
    // user to the users[] array of a private channel in Firestore, and then
    // navigate the user to that private channel.
    this.firestore.firestore
      .collection('accounts')
      .doc(firebase.auth().currentUser.uid)
      .update({ lastSubmittedPassword: form.value.channelPassword })
      .then(response => {
        this.firestore.firestore
          .collection('channels')
          .doc(this.channelName)
          .collection('users')
          .doc('users')
          .update({ users: firebase.firestore.FieldValue.arrayUnion(this.userName) })
      })
      .then(response => {
        this.authChannelService.authenticatedChannel.next(this.channelName);
        this.router.navigate(['/channel', this.channelName]);
      })
      .catch(error => this.errorMessage = 'Password could not be authenticated.');
  }
}