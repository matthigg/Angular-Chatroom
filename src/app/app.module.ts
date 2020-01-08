// Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChannelsModule } from './channels/channels.module';
import { ChannelsRoutingModule } from './channels/channels-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Angular Material Modules
import { 
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { NavToolbarComponent } from './nav-toolbar/nav-toolbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SideNavComponent } from './side-nav/side-nav.component';

// Pipes
// import { ConsoleLogPipe } from './shared/console-log.pipe';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FooterToolbarComponent } from './footer-toolbar/footer-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    // ConsoleLogPipe,
    NavToolbarComponent,
    SideNavComponent,
    PageNotFoundComponent,
    FooterToolbarComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChannelsModule,
    ChannelsRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
