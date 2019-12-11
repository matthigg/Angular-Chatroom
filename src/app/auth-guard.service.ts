import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

// RxJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Services
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.user.pipe(map(user => {
      return !!user;
    }));
  }
}
