// Modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Angular Material Modules
import { 
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
} from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavToolbarComponent } from './nav-toolbar/nav-toolbar.component';
import { SignUpComponent } from './sign-up/sign-up.component';

// Services & Pipes
import { ConsoleLogPipe } from './ng-pipes/console-log.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConsoleLogPipe,
    LoginComponent,
    NavToolbarComponent,
    SignUpComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
