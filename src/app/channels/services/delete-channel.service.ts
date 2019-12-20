import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteChannelService {

  constructor() { }

  onDeleteChannel() {
    console.log('delete')
  }
}