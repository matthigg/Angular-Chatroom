import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { SideNavComponent } from './side-nav/side-nav.component';
import { SisuComponent } from './sisu/sisu.component';

// Services
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: SisuComponent },
  { 
    path: 'home', 
    canActivate: [ AuthGuardService ],
    component: SideNavComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
