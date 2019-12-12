import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AuthComponent } from './auth/auth.component';
import { ChannelsComponent } from './channels/channels.component';
import { ChannelComponent } from './channels/channel/channel.component';
import { SideNavComponent } from './side-nav/side-nav.component';

// Services
import { AuthGuardService } from './auth/services/auth-guard.service';

const routes: Routes = [
  { 
    path: '', 
    // canActivate: [ AuthGuardService ],
    component: SideNavComponent 
  },
  { path: 'auth', component: AuthComponent },
  { path: 'channels', component: ChannelsComponent },
  { path: 'channel', redirectTo: 'channels' },
  { path: 'channel/:name', component: ChannelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
