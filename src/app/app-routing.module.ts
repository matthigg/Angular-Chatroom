// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthComponent } from './auth/auth.component';
import { DeleteAccountComponent } from './auth/delete-account/delete-account.component';

// Services
import { AuthGuardService } from './auth/services/auth-guard.service';

const routes: Routes = [
  { 
    path: '', 
    canActivate: [ AuthGuardService ],
    pathMatch: 'full',
    redirectTo: '/channels'
  },
  { path: 'auth', component: AuthComponent },
  { path: 'delete-account', component: DeleteAccountComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
