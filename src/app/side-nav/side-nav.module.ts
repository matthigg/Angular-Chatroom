// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideNavRoutingModule } from './side-nav-routing.module';

// Angular Material Modules
import { 
  MatSidenavModule,
} from '@angular/material';

// Components
import { ChannelsComponent } from './channels/channels.component';
import { ChannelComponent } from './channels/channel/channel.component';
import { SideNavComponent } from './side-nav.component';

@NgModule({
  declarations: [
    ChannelsComponent,
    ChannelComponent,
    SideNavComponent,
  ],
  exports: [
    ChannelsComponent,
    ChannelComponent,
    SideNavComponent,
  ],
  imports: [
    MatSidenavModule,
    RouterModule,
    SideNavRoutingModule,
  ]
})
export class SideNavModule { }