// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ChannelsComponent } from './channels.component';
import { ChannelComponent } from './channel/channel.component';

const routes: Routes = [
  { path: 'channels', component: ChannelsComponent },
  { 
    path: 'channel', component: ChannelComponent, 
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/channels' },
      { path: ':name', component: ChannelComponent },
    ],
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ChannelsRoutingModule { }