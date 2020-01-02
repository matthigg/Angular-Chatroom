import { Component, OnDestroy, OnInit } from '@angular/core';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { AuthService } from '../auth/services/auth.service';
import { ToggleSideNavService } from '../side-nav/services/toggle-side-nav.service';

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
    private toggleSideNavService: ToggleSideNavService,
  ) { }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userSubscription = this.authService.user
      .subscribe(user => { 
          this.isAuthenticated = !!user;
        }
      )
  }
  
  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  onToggleSideNav() {
    this.toggleSideNavService.handleSideNav('toggle');
  }
}
