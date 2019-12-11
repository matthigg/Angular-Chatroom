import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(){

    // Log in user if user data is stored in localStorage
    this.authService.autoLogin();
  }
 }
