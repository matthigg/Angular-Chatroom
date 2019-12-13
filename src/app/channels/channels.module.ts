// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { 
} from '@angular/material';

// Components
import { ChannelsComponent } from './channels.component';
import { ChannelComponent } from './channel/channel.component';

@NgModule({
  declarations: [
    ChannelsComponent,
    ChannelComponent,
  ],
  exports: [
    ChannelsComponent,
    ChannelComponent,
  ],
  imports: [
    RouterModule,
  ]
})
export class ChannelsModule { }