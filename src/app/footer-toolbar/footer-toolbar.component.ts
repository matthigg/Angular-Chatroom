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
  activeChannelSubscription: Subscription;
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
    if (this.userNameSub) this.userNameSub.unsubscribe();
  }

  ngOnInit() {
    this.formInput = this.fb.group({
      input: ['', [Validators.required]]
    });

    this.activeChannelSubscription = this.channelMessagesService.activeChannel
      .subscribe(channel => this.activeChannel = channel);
  }

  onSubmit(inputField): void {
    inputField.value = '';
    this.message = this.formInput.value.input;
    this.userNameSub = this.authService.user.subscribe(user => {
      user ? this.userName = user.email : this.userName = null;
    });
    this.channelMessagesService.addANewMessage(this.userName, this.activeChannel, this.message)
      .catch(error => console.log('=== error:', error));
  }

}
