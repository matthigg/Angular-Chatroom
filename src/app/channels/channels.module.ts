// Modules
import { CommonModule } from '@angular/common';
import { DeleteChannelModule } from '../shared/delete-channel/delete-channel.module';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { 
  MatListModule
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
    CommonModule,
    DeleteChannelModule,
    LoadingSpinnerModule,
    MatListModule,
    RouterModule, 
  ]
})
export class ChannelsModule { }