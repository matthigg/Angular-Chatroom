import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListChannelsComponent } from './list-channels.component';

@NgModule({
  declarations: [
    ListChannelsComponent
  ],
  exports: [
    ListChannelsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ListChannelsModule { }
