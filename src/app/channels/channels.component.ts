import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

// Modules
import { NgForm } from '@angular/forms';
 
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
  allChannels: string[] = [];
  createChannelSub: Subscription;
  isLoading: boolean;
  listAllChannelsSub: Subscription;

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
      .pipe(take(1))
      .subscribe(
        response => this.router.navigate(['channel', form.value.channelName]),
        error => console.log('There was an error creating the channel:', error)
      )
  }

  onDeleteChannel() {
    this.deleteChannelService.onDeleteChannel();
  }
}