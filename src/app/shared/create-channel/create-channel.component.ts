import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log('--- submitted:', form)
    console.log('--- submitted:', form.value.channelName)
  }
}
