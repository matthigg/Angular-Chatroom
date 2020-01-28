import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// RxJS
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

// Angular Material Modules
import { MatSnackBar } from '@angular/material';
 
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
  private subscriptions = new Subscription();
  allChannels = {};
  channelsExist: boolean;
  errorChannelCreation: string = '';
  errorChannelDeletion: string = '';
  errorFetchChannels: string = '';
  isLoading: boolean;
  objectKeys = Object.keys;

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
    if (this.subscriptions) this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    setTimeout(() => {
      this.toggleSideNavService.handleSideNav('open');
    }, 0)
    this.onListAllChannels();
  }

  // Get channel meta data, ie. creator, permissions
  private onGetChannelMetaData(channelName: string): Observable<any> {
    return <any>this.listChannelsService.onGetChannelMetaData(channelName)
  }

  // Gather a list of all active channels to be displayed 
  private onListAllChannels(): void {
    this.isLoading = true;
    this.subscriptions.add(this.listChannelsService.onListAllChannels()
      .subscribe(
        channels => {
          if (channels.length > 0) {
            this.channelsExist = true;
            this.allChannels = {}
            channels.forEach(channel => {

              // This grabs the meta data for a channel, ie. 'creator' and
              // 'permissions', from a Firestore sub-collection
              this.onGetChannelMetaData(channel.payload.doc.id)
                .pipe(take(1))
                .subscribe(
                  channelMetaData => {
                    this.allChannels[channel.payload.doc.id] = {
                      channelCreator: channelMetaData.payload.data().creator,
                      channelPermission: channelMetaData.payload.data().permission,
                    } 
                  },
                  error => console.log('=== Error:', error),
                );
            });
          } else {
            this.channelsExist = false;
          }
          this.isLoading = false;
        },
        error => this.errorFetchChannels = 'Error: Could not get list of channels. ' + error
      )
    );
  }

  // Delete a channel
  onDeleteChannel(
    channelName: string, 
    channelPermission: string, 
    channelCreator: string,
  ): Promise<any> {
    return this.deleteChannelService.onDeleteChannel(
      channelName, 
      channelPermission, 
      channelCreator,
    )
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