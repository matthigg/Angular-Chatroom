import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-channel',
  templateUrl: './delete-channel.component.html',
  styleUrls: ['./delete-channel.component.scss']
})
export class DeleteChannelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onDeleteChannel(form) {
    console.log('delete channel, form:', form)
  }

}
