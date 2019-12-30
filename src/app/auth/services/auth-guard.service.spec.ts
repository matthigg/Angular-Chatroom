import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

// Modules
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { AuthGuardService } from './auth-guard.service';

// Models
import { User } from '../models/user.model';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });
    service = TestBed.get(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should have the canActivate() guard return 'true' if user session exists`, () => {
    service['authService'].user.next(new User('test', 'test', 'test', new Date()));
    service.canActivate(new ActivatedRouteSnapshot, <RouterStateSnapshot>{ url: 'test url' })
      .subscribe(response => {
        expect(response).toBe(true);
      });
  });

  it(`should have the canActivate() guard return a UrlTree if user session does not exists`, () => {
    service['authService'].user.next(null);
    service.canActivate(new ActivatedRouteSnapshot, <RouterStateSnapshot>{ url: 'test url' })
      .subscribe(response => {
        expect(typeof response).toBe(typeof new UrlTree())
      });
  });
});
