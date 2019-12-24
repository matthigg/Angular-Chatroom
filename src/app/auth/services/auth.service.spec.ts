// @Angular
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { AuthService } from './auth.service';

// Models
import { User } from '../models/user.model';

describe('AuthService', () => {
  let errorResponse: { error: { error: { message: string } } } | null | undefined;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });
    errorResponse = null;
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should store user information in localStorage when handleAuthentication() is invoked`, () => {
    service['handleAuthentication']('test email', 'test userId', 'test token', 0);
    expect(localStorage.getItem('userData')).toBeTruthy();
  });

  it(`should handle error responses 'null' and 'undefined'`, () => {
    errorResponse = null;
    service['handleError'](errorResponse)
      .subscribe(
        response => expect(response).toBeFalsy(),
        error => expect(error).toEqual('An unknown error occurred.'),
      );
  });

  it(`should handle error response 'EMAIL_EXISTS'`, () => {
    errorResponse = { error: { error: { message: 'EMAIL_EXISTS' } } };
    service['handleError'](errorResponse)
      .subscribe(
        response => expect(response).toBeFalsy(),
        error => expect(error).toEqual('This email has already been registered.'),
      );
  });

});
