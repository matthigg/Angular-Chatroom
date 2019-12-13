import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  channel: {
    name: string
  };

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.channel = {
      name: this.activatedRoute.snapshot.params['name'],
    }
  }

}
