// Modules
import { CommonModule } from '@angular/common';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Angular Material Modules
import { 
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

// Components
import { AuthComponent } from './auth.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

@NgModule({
  declarations: [
    AuthComponent,
    CreateAccountComponent,
    LoginComponent,
    DeleteAccountComponent,
  ],
  exports: [
    AuthComponent,
    CreateAccountComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoadingSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule {}