import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

// Modules
import { NgForm } from '@angular/forms';

// Angular Material Modules
import {
  MatListItem
} from '@angular/material';
 
// Services
import { CreateChannelService } from './services/create-channel.service';
import { DeleteChannelService } from './services/delete-channel.service';
import { ListChannelsService } from './services/list-channels.service';
import { ToggleSideNavService } from '../side-nav/services/toggle-side-nav.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnDestroy, OnInit {
  private createChannelSub: Subscription;
  private listAllChannelsSub: Subscription;
  allChannels: string[] = [];
  channelsExist: boolean;
  errorChannelCreation: string = '';
  isLoading: boolean;

  constructor(
    private createChannelService: CreateChannelService,
    private deleteChannelService: DeleteChannelService,
    private listChannelsService: ListChannelsService,
    private router: Router,
    private toggleSideNavService: ToggleSideNavService
  ) { }

  ngOnDestroy() {
    if (this.createChannelSub) this.createChannelSub.unsubscribe();
    if (this.listAllChannelsSub) this.listAllChannelsSub.unsubscribe();
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
          this.channelsExist = true;
          const channelList = Object.values(channels);
          channelList.forEach(obj => {
            this.allChannels.push(obj.channelName)
          });
        } else {
          this.channelsExist = false;
        }
        this.isLoading = false;
      });
  }

  onCreateChannel(form: NgForm) {
    this.createChannelSub = this.createChannelService.onCreateChannel(form)
      .pipe(take(1))
      .subscribe(
        response => this.router.navigate(['channel', form.value.channelName]),
        error => this.errorChannelCreation = 'Error: could not create channel.'
      )
  }

  onDeleteChannel(channelListItem: MatListItem) {
    this.deleteChannelService.onDeleteChannel(channelListItem);
  }
}