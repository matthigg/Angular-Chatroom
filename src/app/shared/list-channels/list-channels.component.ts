import { Component, OnInit } from '@angular/core';

// Services
import { ListChannelsService } from './services/list-channels.service';

@Component({
  selector: 'app-list-channels',
  templateUrl: './list-channels.component.html',
  styleUrls: ['./list-channels.component.scss']
})
export class ListChannelsComponent implements OnInit {
  allChannels: string[] = ['chan 1', 'chan 2'];

  constructor(private listChannelsService: ListChannelsService) { }

  ngOnInit() {
    // this.onListAllChannels();
  }

  private onListAllChannels() {
    this.listChannelsService.onListAllChannels()
      .subscribe(channels => {
        console.log('--- channels:', channels);
      })
  }
}
