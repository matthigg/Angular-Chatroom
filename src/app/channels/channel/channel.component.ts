import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { ChannelMessagesService } from './services/channel-messages.service';
import { ToggleSideNavService } from '../../side-nav/services/toggle-side-nav.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnDestroy, OnInit {
  channelNameSub: Subscription;
  messages: {}[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private channelMessagesService: ChannelMessagesService,
    private toggleSideNavService: ToggleSideNavService,
  ) { }

  ngOnDestroy() {
    if (this.channelNameSub) this.channelNameSub.unsubscribe();
  }

  ngOnInit() {

    // Get the channel name from the URL & retrieve channel messages
    this.channelNameSub = this.activatedRoute.params
      .subscribe(value => {
        this.channelMessagesService.activeChannel.next(value.name);
        this.retrieveMessages(value.name);
      });

    // Open the side nav
    setTimeout(() => {
      this.toggleSideNavService.handleSideNav('open');
    }, 0);
  }

  retrieveMessages(channelName): void {
    this.channelMessagesService.retrieveMessages(channelName).onSnapshot(
      doc => doc.data() ? this.messages = doc.data().messages : this.messages = null
    )
  }

}
