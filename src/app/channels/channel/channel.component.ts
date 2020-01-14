import { ActivatedRoute } from '@angular/router';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

// RxJS
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

// Services
import { AuthService } from '../../auth/services/auth.service';
import { ChannelMessagesService } from './services/channel-messages.service';
import { ChannelPasswordService } from './services/channel-password.service';
import { ChannelUsersService } from './services/channel-users.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnDestroy, OnInit {
  channelName: string;
  isLoading: boolean = false;
  messages: {}[] = [];
  userName: string;
  private channelNameSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private channelMessagesService: ChannelMessagesService,
    private channelPasswordService: ChannelPasswordService,
    private channelUsersService: ChannelUsersService,
    private zone: NgZone,
  ) { }

  ngOnDestroy() {
    if (this.channelNameSub) this.channelNameSub.unsubscribe();
    this.channelMessagesService.activeChannel.next(null);

    // Remove user's name from the current channel's list of usernames
    this.channelUsersService.removeAUser(this.userName, this.channelName)
  }

  ngOnInit() {

    // Get the channel name from the URL, set the active channel, retrieve 
    // channel messages, and check whether or not channel is private
    this.channelNameSub = this.activatedRoute.params
      .subscribe(value => {
        this.channelName = value.name;
        this.isChannelPrivate(this.channelName);
        setTimeout(() => {
          this.channelMessagesService.activeChannel.next(value.name);
        }, 0)
        this.retrieveMessages(value.name);
      });

    // Get user name
    this.authService.user.pipe(take(1)).subscribe(user => {
      user ? this.userName = user.name : this.userName = null;
    });

    // Add user name to the current channel's list of usernames
    this.channelUsersService.addANewUser(this.userName, this.channelName)
  }

  // GET chat messages and user list from Firestore
  retrieveMessages(channelName: string): void {
    this.isLoading = true;
    this.channelMessagesService.retrieveMessages(channelName).onSnapshot(
      doc => {
        this.zone.run(() => { 
          doc.data() ? this.messages = doc.data().messages : this.messages = null;
          doc.data() ? this.channelMessagesService.userList.next(doc.data().users) : this.channelMessagesService.userList.next(null);
          this.isLoading = false;
        });
      }
    )
  }

  isChannelPrivate(channelName: string) {
    this.channelPasswordService.isChannelPrivate(channelName)
      .then(response => { if (response.data().password) this.promptUserForPassword() })
      .catch(error => console.log('=== error:', error));
  }

  promptUserForPassword() {
    console.log('=== PROMPT user for password')
  }
}
