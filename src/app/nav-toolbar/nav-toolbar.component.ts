import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss']
})
export class NavToolbarComponent implements OnDestroy, OnInit {
  private userSubscription: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userSubscription = this.authService.user
      .subscribe(user => { 
          this.isAuthenticated = !!user;
        }
      )
  }

  test() {
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }
}
