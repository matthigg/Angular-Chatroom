// Modules
import { CommonModule } from '@angular/common';
import { DeleteChannelModule } from '../delete-channel/delete-channel.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


// Angular Material Modules
import { MatListModule } from '@angular/material';

// Components
import { ListChannelsComponent } from './list-channels.component';

@NgModule({
  declarations: [
    ListChannelsComponent
  ],
  exports: [
    ListChannelsComponent
  ],
  imports: [
    CommonModule,
    DeleteChannelModule,
    LoadingSpinnerModule,
    MatListModule,
    RouterModule,
  ]
})
export class ListChannelsModule { }
