import { ActivatedRoute } from '@angular/router';
import { 
  AfterViewInit, 
  Component, 
  ElementRef, 
  NgZone, 
  OnDestroy, 
  OnInit, 
  ViewChild 
} from '@angular/core';

// RxJS
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { MatList } from '@angular/material';

// Services
import { AuthChannelService } from '../auth-channel/services/auth-channel.service';
import { AuthService } from '../../auth/services/auth.service';
import { ChannelMessagesService } from './services/channel-messages.service';
import { ChannelUsersService } from './services/channel-users.service';
import { ScrollToBottomOfSidenavContentService } from '../../side-nav/services/scroll-to-bottom-of-sidenav-content.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements AfterViewInit, OnDestroy, OnInit {
  channelName: string;
  isChannelPrivate: boolean;
  isLoading: boolean = false;
  messages: {}[] = [];
  userName: string;
  private authChannelServiceSub: Subscription;
  private channelNameSub: Subscription;
  @ViewChild('matList', { static: false, read: ElementRef }) matList: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authChannelService: AuthChannelService,
    private authService: AuthService,
    private channelMessagesService: ChannelMessagesService,
    private channelUsersService: ChannelUsersService,
    private scrollToBottomOfSidenavContentService: ScrollToBottomOfSidenavContentService,
    private zone: NgZone,
  ) { }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.authChannelServiceSub) this.authChannelServiceSub.unsubscribe();
    if (this.channelNameSub) this.channelNameSub.unsubscribe();
    this.authChannelService.authenticatedChannel.next(null);
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
        setTimeout(() => {
          this.channelMessagesService.activeChannel.next(value.name);
        }, 0)

         // Since this method relies on a @ViewChild element, this entire
         // subscription may need to be placed within ngAfterViewInit
        this.retrieveMessages(value.name);
        this.retrieveUsers(value.name);
        this.authChannelServiceSub = this.authChannelService.channelIsPrivate.subscribe(
          response => this.isChannelPrivate = response, 
          error => console.log('=== Error:', error)
        );
      });

    // Get user name
    this.authService.user.pipe(take(1)).subscribe(
      user => user ? this.userName = user.name : this.userName = null,
      error => console.log('=== Error:', error)
    );

    // Add user name to the current channel's list of usernames if the channel
    // is public
    if (!this.isChannelPrivate) {
      this.channelUsersService.addANewUser(this.userName, this.channelName)
        .catch(error => console.log('=== Error:', error))
    }
  }

  // GET chat messages from Firestore
  retrieveMessages(channelName: string): void {
    this.isLoading = true;
    this.channelMessagesService.retrieveMessages(channelName).onSnapshot(
      doc => {
        this.zone.run(() => { 
          if (doc.data()) {
            this.messages = doc.data().messages;
            setTimeout(() => this.setScrollHeight());
          } else {
            this.messages = null;
          } 
          this.isLoading = false;
        });
      },
      error => console.log('=== Error:', error)
    )
  }

  // GET users from Firestore
  retrieveUsers(channelName: string): void {
    this.channelUsersService.retrieveUsers(channelName).onSnapshot(
      doc => {
        this.zone.run(() => {
          doc.data() ? this.channelUsersService.userList.next(doc.data().users) : this.channelUsersService.userList.next(null);
        })
      }
    );
  }

  // Scroll to the bottom of the list of channel messages
  setScrollHeight() {
    const scrollHeight = this.matList.nativeElement.scrollHeight;
    this.scrollToBottomOfSidenavContentService.setScrollHeight = scrollHeight
  }
}
