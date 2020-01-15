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

@Injectable({
  providedIn: 'root'
})
export class ChannelGuardService {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  // ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
  ): Observable<boolean | UrlTree> {

    return new Observable(obs => obs.next(true))

    // return this.authService.user.pipe(
    //   take(1),
    //   map(user => {
    //     const isAuth = !!user;
    //     if (isAuth) { return true }
    //     return this.router.createUrlTree(['/auth']);
    //   }),
    // );
  }
}
