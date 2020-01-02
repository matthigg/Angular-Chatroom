import { Injectable } from '@angular/core';

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
export class ChannelMessagesService {
  private allChannelMessagesSub = new BehaviorSubject(null);
  private allChannelMessages: {};

  constructor() { }

  retrieveMessages(channel) {
    console.log('--- BEFORE allChannelMessages:', this.allChannelMessages);
    this.allChannelMessagesSub
      .subscribe(
        response => {
          this.allChannelMessages = response;
          console.log('--- AFTER allChannelMessages:', this.allChannelMessages);
        },
        error => console.log(error, 'Error: Could not retrieve messages'),
      )

    // Retrieve messages from API endpoint
    this.allChannelMessagesSub.next(mockChannelMessages);
  }

  updateMessages(message) {

  }
}
