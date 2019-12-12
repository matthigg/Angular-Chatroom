// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavRoutingModule } from './side-nav/side-nav-routing.module';

// Components
import { AuthComponent } from './auth/auth.component';
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
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
