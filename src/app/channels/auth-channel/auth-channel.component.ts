import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { AuthChannelService } from './services/auth-channel.service';

@Component({
  selector: 'app-auth-channel',
  templateUrl: './auth-channel.component.html',
  styleUrls: ['./auth-channel.component.scss']
})
export class AuthChannelComponent implements OnInit {
  channelName: string;
  channelIsPrivate: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authChannelService: AuthChannelService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.channelName = this.activatedRoute.snapshot.paramMap['params'].name;
    this.authChannelService.isChannelPrivate(this.channelName)
      .then(response => {
        if (response === 'public') {
          this.authChannelService.authenticatedChannel.next(this.channelName);
          this.channelIsPrivate = false;
          this.router.navigate(['/channel', this.channelName]);
        } else if (response === 'private') {
          // TODO
          this.channelIsPrivate = true;

        }
      })
      .catch(error => console.log('=== Error:', error))
  }

  onSubmit(form) {
    console.log('=== form:', form)
  }
}
