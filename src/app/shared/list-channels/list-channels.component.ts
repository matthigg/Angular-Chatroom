import { Component, OnDestroy, OnInit } from '@angular/core';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { ListChannelsService } from './services/list-channels.service';

@Component({
  selector: 'app-list-channels',
  templateUrl: './list-channels.component.html',
  styleUrls: ['./list-channels.component.scss']
})
export class ListChannelsComponent implements OnDestroy, OnInit {
  allChannels: string[] = [];
  isLoading: boolean;
  listAllChannelsSub: Subscription;

  constructor(private listChannelsService: ListChannelsService) { }

  ngOnDestroy() {
    this.listAllChannelsSub.unsubscribe()
  }

  ngOnInit() {
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
