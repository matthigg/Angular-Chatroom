import { Injectable } from '@angular/core';

// Angular Material Modules
import {
  MatListItem
} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DeleteChannelService {

  constructor() { }

  onDeleteChannel(channel: MatListItem) {
    console.log('delete:', channel)
  }
}