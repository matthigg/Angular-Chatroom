import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  channelName: string;
  channelNameSub: Subscription;
  messages: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private channelMessagesService: ChannelMessagesService,
    private toggleSideNavService: ToggleSideNavService,
  ) { }

  ngOnDestroy() {
    this.channelNameSub.unsubscribe();
  }

  ngOnInit() {

    this.channelNameSub = this.activatedRoute.params
      .subscribe(value => {

        // Grab the channel name from the URL
        this.channelName = value.name;

        // Retrieve channel messages from the ChannelMessagesService
        this.channelMessagesService.retrieveMessages(this.channelName);
      });

    // Open the side nav
    setTimeout(() => {
      this.toggleSideNavService.handleSideNav('open');
    }, 0);


  }
}
