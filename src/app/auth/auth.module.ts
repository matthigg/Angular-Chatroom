// Modules
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerModule } from '../shared/loading-spinner/loading-spinner.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Angular Material Modules
import { 
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

// Components
import { AuthComponent } from './auth.component';
import { CreateAccountComponent } from './create-account/create-account.component';
// import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AuthComponent,
    CreateAccountComponent,
    // LoadingSpinnerComponent,
    LoginComponent,
  ],
  exports: [
    AuthComponent,
    CreateAccountComponent,
    LoginComponent,
  ],
  imports: [
    // BrowserAnimationsModule,
    BrowserModule,
    // HttpClientModule,
    LoadingSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule {}