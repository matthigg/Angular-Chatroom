import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

// Services
import { CreateChannelService } from './services/create-channel.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit {

  constructor(
    private createChannelService: CreateChannelService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  onCreateChannel(form) {
    this.createChannelService.onCreateChannel(form)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}
