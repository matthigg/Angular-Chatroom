import { Component, OnInit } from '@angular/core';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { ListChannelsService } from './services/list-channels.service';
import { ToggleSideNavService } from '../side-nav/services/toggle-side-nav.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  allChannels: string[] = [];
  isLoading: boolean;
  listAllChannelsSub: Subscription;

  constructor(
    private listChannelsService: ListChannelsService,
    private toggleSideNavService: ToggleSideNavService
  ) { }

  ngOnDestroy() {
    this.listAllChannelsSub.unsubscribe()
  }

  ngOnInit() {
    setTimeout(() => {
      this.toggleSideNavService.handleSideNav('open');
    }, 0)
    this.onListAllChannels();
  }

  private onListAllChannels() {
    this.isLoading = true;
    this.listAllChannelsSub = this.listChannelsService.onListAllChannels()
      .subscribe(channels => {
        if (channels) {
          const channelList = Object.values(channels);
          channelList.forEach(obj => {
            this.allChannels.push(obj.channelName)
          });
        }
        this.isLoading = false;
      });
  }

}
