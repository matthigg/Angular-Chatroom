import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Angular Material Modules
import {
  MatListItem
} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DeleteChannelService {

  constructor(private http: HttpClient) { }

  onDeleteChannel(channel: MatListItem) {
    return this.http.delete(
      `https://angular-chatroom-78cb6.firebaseio.com/channels/${channel}.json`,
    );
  }
}