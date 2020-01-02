import { Injectable, OnInit } from '@angular/core';

// RxJS
import { BehaviorSubject, of } from 'rxjs';

let mockChannelMessages = {
  channel1: [
    { 'user1': 'message 1'},
    { 'user2': 'message 2'},
    { 'user3': 'message 3'},
  ],
  channel2: [
    { 'user4': 'message 4'},
    { 'user5': 'message 5'},
    { 'user6': 'message 6'},
  ],
};

@Injectable({
  providedIn: 'root'
})
export class ChannelMessagesService implements OnInit {
  private _allChannelMessages: BehaviorSubject<Object>;

  constructor() { }

  ngOnInit() {

  }

  retrieveMessages(channel) {
    return this._allChannelMessages[channel];
  }
}
