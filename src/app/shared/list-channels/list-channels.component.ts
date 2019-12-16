import { Component, OnInit } from '@angular/core';

// Services
import { ListChannelsService } from './services/list-channels.service';

@Component({
  selector: 'app-list-channels',
  templateUrl: './list-channels.component.html',
  styleUrls: ['./list-channels.component.scss']
})
export class ListChannelsComponent implements OnInit {

  constructor(private listChannelsService: ListChannelsService) { }

  ngOnInit() {
    this.onListAllChannels();
  }

  onListAllChannels() {
    this.listChannelsService.onListAllChannels()
  }
}
