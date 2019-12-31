import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreateChannelService {

  constructor(private http: HttpClient) { }

  onCreateChannel(form: NgForm) {
    return this.http.post(
      'https://angular-chatroom-78cb6.firebaseio.com/channels.json',
      form.value
    );
  }
}
