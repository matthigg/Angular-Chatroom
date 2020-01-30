import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  darkTheme: boolean = true;

  constructor(public authService: AuthService) { }

  ngOnInit(){

    // Automatically log in user if user data is stored in localStorage
    this.authService.autoLogin();
  }

  handleToggleTheme() {
    this.darkTheme = !this.darkTheme
  }
 }
