import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { AuthService } from '../../auth/services/auth.service';
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
  messages: {}[] = [];
  message: string;
  userName: string;
  userNameSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private channelMessagesService: ChannelMessagesService,
    private fb: FormBuilder,
    private toggleSideNavService: ToggleSideNavService,
  ) { }

  ngOnDestroy() {
    if (this.channelNameSub) this.channelNameSub.unsubscribe();
    if (this.userNameSub) this.userNameSub.unsubscribe();
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

  onSubmit(inputField): void {
    inputField.value = ''
    this.message = this.formInput.value.input;
    this.userNameSub = this.authService.user.subscribe(user => {
      user ? this.userName = user.email : this.userName = null;
    });
    this.channelMessagesService.addANewMessage(this.userName, this.channelName, this.message)
      .catch(error => console.log('=== error:', error));
  }

  retrieveMessages(channelName): void {
    this.channelMessagesService.retrieveMessages(channelName).onSnapshot(
      doc => doc.data()? this.messages = doc.data().messages : this.messages = null
    )
  }
}
