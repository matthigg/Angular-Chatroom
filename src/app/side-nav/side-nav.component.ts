import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { ChannelMessagesService } from '../channels/channel/services/channel-messages.service';
import { CreateChannelService } from '../channels/services/create-channel.service';
import { ToggleSideNavService } from './services/toggle-side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnDestroy, OnInit {
  errorChannelCreation: string = '';
  isAccordionOpen: boolean = false;
  isSideNavOpen: boolean = this.toggleSideNavService.isSideNavOpen;
  users: string[] = [];
  private sideNavSubjectSub: Subscription;
  private usersListSub: Subscription;

  constructor(
    private channelMessagesService: ChannelMessagesService,
    private createChannelService: CreateChannelService,
    private router: Router,
    private toggleSideNavService: ToggleSideNavService,
  ) { }

  ngOnDestroy() {
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
  }

  onCreateChannel(form: NgForm): Promise<any> {
    this.isAccordionOpen = false;
    return this.createChannelService.onCreateChannel(form)
      .then(response => { 
        this.router.navigate(['channel', form.value.channelName]);
        form.reset();
      })
      .catch(error => { this.errorChannelCreation = 'Error: could not create channel.' });
  }
}
