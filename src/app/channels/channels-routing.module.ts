// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ChannelsComponent } from './channels.component';
import { ChannelComponent } from './channel/channel.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

// Services
import { AuthGuardService } from '../auth/services/auth-guard.service';

const routes: Routes = [
  { 
    path: 'channels', 
    canActivate: [ AuthGuardService ],
    component: ChannelsComponent 
  },
  { 
    path: 'channel', 
    canActivate: [ AuthGuardService ],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/channels' },
      { path: ':name', component: ChannelComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ChannelsRoutingModule { }