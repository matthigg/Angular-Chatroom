import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// RxJS
import { Subscription } from 'rxjs';


// Services
import { ChannelMessagesService } from './services/channel-messages.service';
import { ToggleSideNavService } from '../../side-nav/services/toggle-side-nav.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnDestroy, OnInit {
  channelName: string;
  channelNameSub: Subscription;
  formInput: FormGroup;
  messages: {}[];
  userName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private channelMessagesService: ChannelMessagesService,
    private fb: FormBuilder,
    private toggleSideNavService: ToggleSideNavService,
  ) { }

  ngOnDestroy() {
    this.channelNameSub.unsubscribe();
  }

  ngOnInit() {

    // Get the channel name from the URL & retrieve channel messages
    this.channelNameSub = this.activatedRoute.params
      .subscribe(value => {
        this.channelName = value.name;
        this.retrieveMessages(this.channelName);
      });

    // Open the side nav
    setTimeout(() => {
      this.toggleSideNavService.handleSideNav('open');
    }, 0);

    // Initialize the input bar
    this.formInput = this.fb.group({
      input: ['', [Validators.required]]
    })
  }

  addANewMessage(userName: string, message: string): void {
    this.channelMessagesService.addANewMessage(userName, message);
  }

  retrieveMessages(channelName): void {
    this.channelMessagesService.retrieveMessages(channelName)
      .then(querySnapshot => this.messages = querySnapshot.data().messages)
      .catch(error => console.log('=== error:', error));
  }
}
