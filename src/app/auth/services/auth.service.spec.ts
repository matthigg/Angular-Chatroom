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

  it(`should handle error response 'EMAIL_NOT_FOUND'`, () => {
    errorResponse = { error: { error: { message: 'EMAIL_NOT_FOUND' } } };
    service['handleError'](errorResponse)
      .subscribe(
        response => expect(response).toBeFalsy(),
        error => expect(error).toEqual('Email not found.'),
      );
  });

  it(`should handle error response 'INVALID_EMAIL`, () => {
    errorResponse = { error: { error: { message: 'INVALID_EMAIL' } } };
    service['handleError'](errorResponse)
      .subscribe(
        response => expect(response).toBeFalsy(),
        error => expect(error).toEqual('Email is invalid.'),
      );
  });

  it(`should handle error response 'INVALID_PASSWORD`, () => {
    errorResponse = { error: { error: { message: 'INVALID_PASSWORD' } } };
    service['handleError'](errorResponse)
      .subscribe(
        response => expect(response).toBeFalsy(),
        error => expect(error).toEqual('Password is invalid.'),
      );
  });

  it(`should handle error response 'USER_DISABLED`, () => {
    errorResponse = { error: { error: { message: 'USER_DISABLED' } } };
    service['handleError'](errorResponse)
      .subscribe(
        response => expect(response).toBeFalsy(),
        error => expect(error).toEqual('This account has been disabled by an administrator.')
      );
  });

});
