import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthChannelService } from './services/auth-channel.service';
import { AuthService } from '../../auth/services/auth.service';

// Models
import { User } from '../../auth/models/user.model';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from '@firebase/app';
import '@firebase/firestore';

@Component({
  selector: 'app-auth-channel',
  templateUrl: './auth-channel.component.html',
  styleUrls: ['./auth-channel.component.scss']
})
export class AuthChannelComponent implements OnInit {
  channelName: string;
  channelIsPrivate: boolean = false;
  userName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authChannelService: AuthChannelService,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit() {

    // Get user name
    this.authService.user.subscribe(
      (user: User) => this.userName = user.name,
      error => console.log('=== Error:', error)
    );

    // Get channel name from URL
    this.channelName = this.activatedRoute.snapshot.paramMap['params'].name;

    // Determine if channel is public or private
    this.authChannelService.isChannelPrivate(this.channelName)
      .then(response => {

        // If channel's permission is 'public' then authenticate this channel, halt
        // loading this component, and navigate to the authenticated channel
        if (response === 'public') {
          this.authChannelService.authenticatedChannel.next(this.channelName);
          this.authChannelService.channelIsPrivate.next(false)
          this.channelIsPrivate = false;
          this.router.navigate(['/channel', this.channelName]);

        // If the channel's permission is 'private', finish loading this component
        } else if (response === 'private') {
          this.authChannelService.channelIsPrivate.next(true);
          this.channelIsPrivate = true;
        }
      })
      .catch(error => console.log('=== Error:', error));
  }

  // Handle channel password form submission
  onSubmit(form) {
    console.log('=== channelPassword:', form.value.channelPassword);

    // Don't try to get the private channel password like this - directly
    // grabbing the password from the database is a security vulnerability
    // this.firestore.firestore.collection('channels').doc(this.channelName).get()
    //   .then(documentSnapshot => { documentSnapshot.get('password') })

    // Attempt to add the current user to the users[] array of a private channel,
    // where validation/verification occurs in the Firestore database
    this.firestore.firestore.collection('channels').doc(this.channelName).update(
      {
        // users: 'test guy 6',
        users: firebase.firestore.FieldValue.arrayUnion(this.userName),
        // lastSubmittedPassword: 'asdf',
        lastSubmittedPassword: form.value.channelPassword,
      }
    )
  }
}



// function existingData() { return resource.data }
// function incomingData() { return request.resource.data }
// function currentUser() { return request.auth }