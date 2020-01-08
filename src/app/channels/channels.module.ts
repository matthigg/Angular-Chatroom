// Modules
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { 
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatToolbarModule,
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
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule, 
  ]
})
export class ChannelsModule { }