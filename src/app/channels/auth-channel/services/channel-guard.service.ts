import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';

// RxJS
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// Services
import { AuthChannelService } from './auth-channel.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelGuardService {

  constructor(
    private authChannelService: AuthChannelService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  // ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
  ): Observable<boolean | UrlTree> {
    const channelName = route.children[0].params.name;
    let currentAuthenticatedChannel: string;
    this.authChannelService.authenticatedChannel
      .pipe(take(1))
      .subscribe(
        response => currentAuthenticatedChannel = response,
        error => console.log('=== Error:', error)
      );

    if (channelName === currentAuthenticatedChannel) {
      return new Observable(obs => obs.next(true))
    } else {
      return new Observable(obs => obs.next(this.router.createUrlTree(['/auth-channel', channelName])));
    }
  }
}
