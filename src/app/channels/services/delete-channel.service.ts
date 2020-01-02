import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RxJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteChannelService {

  constructor(private http: HttpClient) { }

  onDeleteChannel(channelId: string): Observable<Object> {
    return this.http.delete(
      `https://angular-chatroom-78cb6.firebaseio.com/channels/${channelId}.json`,
    );
  }
}