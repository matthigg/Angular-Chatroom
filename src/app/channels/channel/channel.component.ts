import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { ToggleSideNavService } from '../../side-nav/services/toggle-side-nav.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnDestroy, OnInit {
  channelName: string;
  channelNameSub: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private toggleSideNavService: ToggleSideNavService
  ) { }

  ngOnDestroy() {
    // this.channelNameSub.unsubscribe();
  }

  ngOnInit() {
    this.channelNameSub = this.activatedRoute.params
      .subscribe(value => {
        this.channelName = value.name;
      })
    setTimeout(() => {
      this.toggleSideNavService.handleSideNav('open')
    });
  }
}
