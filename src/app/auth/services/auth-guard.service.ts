import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';

// RxJS
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

// Services
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  // ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
  ): Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) { return true }
        return this.router.createUrlTree(['/auth']);
      }),
    );

  }
}
