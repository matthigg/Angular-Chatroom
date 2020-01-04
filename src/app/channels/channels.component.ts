import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

// Modules
import { NgForm } from '@angular/forms';

// Angular Material Modules
import { MatSnackBar } from '@angular/material';
 
// Services
import { CreateChannelService } from './services/create-channel.service';
import { DeleteChannelService } from './services/delete-channel.service';
import { ListChannelsService } from './services/list-channels.service';
import { ToggleSideNavService } from '../side-nav/services/toggle-side-nav.service';

// Interfaces
import { ChannelData } from './models/channel-data';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnDestroy, OnInit {
  private listAllChannelsSub: Subscription;
  allChannels: any[] = [];
  channelsExist: boolean;
  errorChannelCreation: string = '';
  errorChannelDeletion: string = '';
  errorFetchChannels: string = '';
  isLoading: boolean;

  constructor(
    private createChannelService: CreateChannelService,
    private deleteChannelService: DeleteChannelService,
    private listChannelsService: ListChannelsService,
    private router: Router,
    private toggleSideNavService: ToggleSideNavService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnDestroy() {
    /* istanbul ignore else*/
    // https://stackoverflow.com/questions/31883320/how-to-ignore-branch-coverage-for-missing-else
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
      .subscribe(
        channels => {
          if (channels.length > 0) {
            this.channelsExist = true;
            this.allChannels = [];
            channels.forEach(channel => {
              this.allChannels.push(
                {
                  channelName: (channel.payload.doc.data() as ChannelData).name,
                  channelId: channel.payload.doc.id,
                }
              );
            });
          } else {
            this.channelsExist = false;
          }
          this.isLoading = false;
        },
        error => this.errorFetchChannels = 'Error: could not get list of channels.'
      );
  }

  onCreateChannel(form: NgForm) {
    this.createChannelService.onCreateChannel(form)
      .then(response => this.router.navigate(['channel', form.value.channelName]))
      .catch(error => this.errorChannelCreation = 'Error: could not create channel.');
  }

  onDeleteChannel(channelId: string, channelName: string) {
    this.deleteChannelService.onDeleteChannel(channelId)
      .then(
        response => {
          this.onListAllChannels();
          this._snackBar.open(
            channelName + ' was deleted', 'x',
            { 
              duration: 3000,
              horizontalPosition: 'center',
              panelClass: ['delete-channel-snackbar'],
            },
          );
        },
      )
      .catch(error => this.errorChannelDeletion = 'Error: could not delete channel.')
  }
}