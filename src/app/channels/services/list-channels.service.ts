import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListChannelsService {

  constructor(private http: HttpClient) { }

  onListAllChannels() {
    return this.http.get('https://angular-chatroom-78cb6.firebaseio.com/channels.json');
  }

  onListFavoriteChannels() {
    console.log('=== list FAVORITE channels')
  }
}
