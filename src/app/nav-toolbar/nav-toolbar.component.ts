import { Component, OnDestroy, OnInit } from '@angular/core';

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

  constructor(private authService: AuthService) { }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userSubscription = this.authService.user
      .subscribe(user => { 
          this.isAuthenticated = !!user;
          console.log('auth success:', user);
        }
      )
  }

  test() {
    console.log('test')
  }
}
