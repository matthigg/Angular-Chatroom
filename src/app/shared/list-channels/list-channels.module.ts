import { CommonModule } from '@angular/common';
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
    MatListModule,
    RouterModule,
  ]
})
export class ListChannelsModule { }
