import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';

// Angular Material
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// Services
import { ChannelMessagesService } from '../channels/channel/services/channel-messages.service';
import { CreateChannelService } from '../channels/services/create-channel.service';
import { ToggleSideNavService } from './services/toggle-side-nav.service';

// ===== SIDE NAV COMPONENT =====
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnDestroy, OnInit {
  activeChannel: string;
  isSideNavOpen: boolean = this.toggleSideNavService.isSideNavOpen;
  users: string[] = [];
  usersLength = users => { if (users) return users.length };
  private activeChannelSub: Subscription;
  private sideNavSubjectSub: Subscription;
  private usersListSub: Subscription;

  constructor(
    public dialog: MatDialog,
    private channelMessagesService: ChannelMessagesService,
    private toggleSideNavService: ToggleSideNavService,
  ) { }

  ngOnDestroy() {
    if (this.activeChannelSub) this.activeChannelSub.unsubscribe();
    if (this.sideNavSubjectSub) this.sideNavSubjectSub.unsubscribe();
    if (this.usersListSub) this.usersListSub.unsubscribe();
  }

  ngOnInit() {

    // Keep track of whether the side nav is open or closed
    this.sideNavSubjectSub = this.toggleSideNavService.sideNavSubject.subscribe(state => {
      this.isSideNavOpen = state;
    });

    // Get list of users in current channel
    this.usersListSub = this.channelMessagesService.userList
      .subscribe(usersArray => this.users = usersArray);

    // Keep track of whether or not there is an active channel
    this.activeChannelSub = this.channelMessagesService.activeChannel
      .subscribe(channel => this.activeChannel = channel);
  }

  // Open dialog to create a new channel
  openCreateChannelDialog(): void {
    this.dialog.open(CreateChannelDialog, { width: '40vw' });
  }
}

// ===== DIALOG COMPONENT ===== 
// Opened when creating a new channel
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './create-channel.dialog.html',
  styleUrls: ['./create-channel.dialog.scss'],
})
export class CreateChannelDialog implements OnInit {
  errorChannelCreation: string = '';
  passwordIsVisible: boolean = false;
  selectedRadioButton: string = 'public';

  constructor(
    public dialogRef: MatDialogRef<CreateChannelDialog>,
    private createChannelService: CreateChannelService, 
    private router: Router,
  ) {}

  ngOnInit() {
  }

  // Create a new channel
  onCreateChannel(form: NgForm): Promise<any> {
    return this.createChannelService.onCreateChannel(form)
      .then(response => { 
        this.router.navigate(['channel', form.value.channelName]);
        form.reset();
        this.dialogRef.close();
      })
      .catch(error => { this.errorChannelCreation = 'Error: could not create channel.' });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}