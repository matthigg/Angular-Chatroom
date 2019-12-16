import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListChannelsService {

  constructor() { }

  onListAllChannels() {
    console.log('list')
  }
}
