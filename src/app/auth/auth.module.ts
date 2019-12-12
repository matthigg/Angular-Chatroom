// Modules
import { BrowserModule } from '@angular/platform-browser';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Angular Material Modules
import { 
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
} from '@angular/material';

// Components
import { AuthComponent } from './auth.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AuthComponent,
    CreateAccountComponent,
    LoginComponent,
  ],
  exports: [
    AuthComponent,
    CreateAccountComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    LoadingSpinnerModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule {}