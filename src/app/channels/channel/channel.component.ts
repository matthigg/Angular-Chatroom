import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { ChannelMessagesService } from './services/channel-messages.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnDestroy, OnInit {
  channelName: string;
  isLoading: boolean = false;
  messages: {}[] = [];
  private channelNameSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private channelMessagesService: ChannelMessagesService,
  ) { }

  ngOnDestroy() {
    if (this.channelNameSub) this.channelNameSub.unsubscribe();
    this.channelMessagesService.activeChannel.next(null);
  }

  ngOnInit() {

    // Get the channel name from the URL & retrieve channel messages
    this.channelNameSub = this.activatedRoute.params
      .subscribe(value => {
        this.channelName = value.name;
        this.channelMessagesService.activeChannel.next(value.name);
        this.retrieveMessages(value.name);
      });
  }

  // GET chat messages and user list from Firestore
  retrieveMessages(channelName: string): void {
    this.isLoading = true;
    this.channelMessagesService.retrieveMessages(channelName).onSnapshot(
      doc => {
        doc.data() ? this.messages = doc.data().messages : this.messages = null;
        doc.data() ? this.channelMessagesService.userList.next(doc.data().users) : this.channelMessagesService.userList.next(null);
        this.isLoading = false;
        setTimeout(() => {}) // trigger change detection
      }
    )
  }
}
