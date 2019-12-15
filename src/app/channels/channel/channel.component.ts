import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { ToggleSideNavService } from '../../side-nav/services/toggle-side-nav.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  channel: {
    name: string
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private toggleSideNavService: ToggleSideNavService
  ) { }

  ngOnInit() {
    this.channel = {
      name: this.activatedRoute.snapshot.params['name'],
    }
    setTimeout(() => {
      this.toggleSideNavService.handleSideNav('open')
    });
  }

}
