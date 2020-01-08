import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { AuthService } from '../auth/services/auth.service';
import { ChannelMessagesService } from '../channels/channel/services/channel-messages.service';

@Component({
  selector: 'app-footer-toolbar',
  templateUrl: './footer-toolbar.component.html',
  styleUrls: ['./footer-toolbar.component.scss']
})
export class FooterToolbarComponent implements OnInit {
  activeChannel: string;
  activeChannelSub: Subscription;
  formInput: FormGroup;
  message: string;
  userName: string;
  userNameSub: Subscription;

  constructor(
    private authService: AuthService,
    private channelMessagesService: ChannelMessagesService,
    private fb: FormBuilder
  ) { }

  ngOnDestroy() {
    if (this.activeChannelSub) this.activeChannelSub.unsubscribe();
    if (this.userNameSub) this.userNameSub.unsubscribe();
  }

  ngOnInit() {

    // Initialize the chat input field in a FormGroup
    this.formInput = this.fb.group({
      input: ['', [Validators.required]]
    });

    // Get the name of the active channel
    this.activeChannelSub = this.channelMessagesService.activeChannel
      .subscribe(channel => this.activeChannel = channel);
  }

  // Handle chat input field form submission
  onSubmit(): void {
    this.message = this.formInput.value.input;
    this.userNameSub = this.authService.user.subscribe(user => {
      user ? this.userName = user.email : this.userName = null;
    });
    this.channelMessagesService.addANewMessage(this.userName, this.activeChannel, this.message)
      .catch(error => console.log('=== error:', error));
    this.formInput.reset();
  }

}
