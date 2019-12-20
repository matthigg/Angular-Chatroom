// Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { 
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
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
    FormsModule,
    LoadingSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    RouterModule, 
  ]
})
export class ChannelsModule { }