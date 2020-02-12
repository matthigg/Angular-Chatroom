import { 
  Component, 
  ElementRef,
  EventEmitter, 
  Input, 
  AfterViewInit,
  OnDestroy, 
  OnInit, 
  Output, 
  ViewChild 
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';

// Angular Material
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// Services
import { AuthChannelService } from '../channels/auth-channel/services/auth-channel.service';
import { ChannelMessagesService } from '../channels/channel/services/channel-messages.service';
import { ChannelUsersService } from '../channels/channel/services/channel-users.service';
import { CreateChannelService } from '../channels/services/create-channel.service';
import { ScrollToBottomOfSidenavContentService } from './services/scroll-to-bottom-of-sidenav-content.service';
import { ToggleSideNavService } from './services/toggle-side-nav.service';

// ===== SIDE NAV COMPONENT =====
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements AfterViewInit, OnDestroy, OnInit {
  activeChannel: string;
  isSideNavOpen: boolean = this.toggleSideNavService.isSideNavOpen;
  users: string[] = [];
  usersLength = users => { if (users) return users.length };
  private activeChannelSub: Subscription;
  private scrollHeightSub: Subscription;
  private sideNavSubjectSub: Subscription;
  private usersListSub: Subscription;
  @Input('darkTheme') darkTheme: string;
  @Output() toggleTheme = new EventEmitter<string>();
  @ViewChild('matSidenavContent', { static: false, read: ElementRef }) matSideNavContent: ElementRef;

  constructor(
    public dialog: MatDialog,
    private channelMessagesService: ChannelMessagesService,
    private channelUsersService: ChannelUsersService,
    private scrollToBottomOfSidenavContentService: ScrollToBottomOfSidenavContentService,
    private toggleSideNavService: ToggleSideNavService,
  ) { }

  ngAfterViewInit() {
    this.scrollHeightSub = this.scrollToBottomOfSidenavContentService.scrollHeight
      .subscribe(

        // Assuming the viewport has a height > 0px this will over-scroll; however,
        // there are no visual side effects
        height => this.matSideNavContent.nativeElement.scrollTop = height,
        error => console.log("=== Error:", error)
      )
  }

  ngOnDestroy() {
    if (this.activeChannelSub) this.activeChannelSub.unsubscribe();
    if (this.scrollHeightSub) this.scrollHeightSub.unsubscribe();
    if (this.sideNavSubjectSub) this.sideNavSubjectSub.unsubscribe();
    if (this.usersListSub) this.usersListSub.unsubscribe();
  }

  ngOnInit() {

    // Keep track of whether the side nav is open or closed
    this.sideNavSubjectSub = this.toggleSideNavService.sideNavSubject.subscribe(state => {
      this.isSideNavOpen = state;
    });

    // Get list of users in current channel
    this.usersListSub = this.channelUsersService.userList
      .subscribe(usersArray => this.users = usersArray);

    // Keep track of whether or not there is an active channel
    this.activeChannelSub = this.channelMessagesService.activeChannel
      .subscribe(channel => this.activeChannel = channel);
  }

  // Open dialog to create a new channel
  openCreateChannelDialog(): void {
    this.dialog.open(CreateChannelDialog, { width: '40vw' });
  }

  onToggleTheme() {
    this.toggleTheme.emit()
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
  @Input('darkTheme') darkTheme: string;
  @Output() toggleTheme = new EventEmitter<string>();

  constructor(
    public dialogRef: MatDialogRef<CreateChannelDialog>,
    private authChannelService: AuthChannelService,
    private createChannelService: CreateChannelService, 
    private router: Router,
  ) {}

  ngOnInit() {
  }

  // Create a new channel
  onCreateChannel(form: NgForm): void {
    this.createChannelService.onCreateChannel(form)
      .then(response => { 

        // Create a private channel, but wait for the password to be created 
        // in Firestore before trying to navigate to the newly created channel.
        // Authenticate channel before navigating the user to the channel to give 
        // the authChannelService a second to update.
        if (form.value.permission === 'private') {
          this.createChannelService.onCreateChannelPassword(form)
            .then(response => {
              this.authChannelService.authenticatedChannel.next(form.value.channelName);
            })
            .then(response => {
              this.router.navigate(['channel', form.value.channelName]);
              form.reset();
              this.dialogRef.close();
            })
            .catch(error => console.log('=== Error:', error));

        // Create a public channel
        } else {
          this.router.navigate(['channel', form.value.channelName]);
          form.reset();
          this.dialogRef.close();
        }
      })
      .catch(error => this.errorChannelCreation = 'Error: could not create channel. ' + error );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}