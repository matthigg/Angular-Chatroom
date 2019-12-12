// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ChannelsComponent } from './channels/channels.component';
import { ChannelComponent } from './channels/channel/channel.component';


const routes: Routes = [
  { path: 'channels', component: ChannelsComponent },
  { path: 'channel', redirectTo: 'channels' },
  { path: 'channel/:name', component: ChannelComponent },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class SideNavRoutingModule { }