import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AuthComponent } from './auth/auth.component';
import { SideNavComponent } from './side-nav/side-nav.component';

// Services
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { 
    path: '', 
    canActivate: [ AuthGuardService ],
    component: SideNavComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
