import { Component, OnDestroy, OnInit } from '@angular/core';

// RxJS
import { Subscription } from 'rxjs';

// Modules
import { NgForm } from '@angular/forms';
 
// Services
import { CreateChannelService } from './services/create-channel.service';
import { ListChannelsService } from './services/list-channels.service';
import { ToggleSideNavService } from '../side-nav/services/toggle-side-nav.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  allChannels: string[] = [];
  createChannelSub: Subscription;
  isLoading: boolean;
  listAllChannelsSub: Subscription;

  constructor(
    private createChannelService: CreateChannelService,
    private listChannelsService: ListChannelsService,
    private toggleSideNavService: ToggleSideNavService
  ) { }

  ngOnDestroy() {
    this.createChannelSub.unsubscribe();
    this.listAllChannelsSub.unsubscribe();
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

  onCreateChannel(form: NgForm) {
    this.createChannelSub = this.createChannelService.onCreateChannel(form)
      .subscribe()
  }

}
