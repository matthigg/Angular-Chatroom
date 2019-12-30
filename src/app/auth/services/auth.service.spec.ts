// @Angular
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { AuthService } from './auth.service';

// Models
import { User } from '../models/user.model';

describe('AuthService', () => {
  let errorResponse: { error: { error: { message: string } } } | null | undefined;
  let httpMock: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });
    errorResponse = null;
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should store user information in localStorage when handleAuthentication() is invoked`, () => {
    service['handleAuthentication']('test email', 'test userId', 'test token', 0);
    expect(localStorage.getItem('userData')).toBeTruthy();
  });

  it(`should handle error response 'null'`, () => {
    errorResponse = null;
    service['handleError'](errorResponse)
      .subscribe(
        response => expect(response).toBeFalsy(),
        error => expect(error).toEqual('An unknown error occurred.'),
      );
  });

  it(`should handle error response 'undefined'`, () => {
    errorResponse = undefined;
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

  it(`should have autoLogin() return 'null' if 'userData' does not exist in localStorage`, () => {
    localStorage.removeItem('userData');
    expect(service.autoLogin()).toEqual(null);
  })

  it(`should have autoLogin() store any localStorage 'userData' into the 'user' BehaviorSubject object`, () => {
    localStorage.setItem('userData', JSON.stringify(new User('test email', 'test id', 'test token', new Date(new Date().getTime() + 1000000))));
    service.autoLogin();
    service.user
      .subscribe(
        response => {
          expect(response.email).toEqual('test email');
          expect(response.id).toEqual('test id');
          expect(response['_token']).toEqual('test token');
          expect(response['_tokenExpirationDate']).toBeTruthy();
        },
        error => expect(error).toBeFalsy(),
      );
    localStorage.removeItem('userData');
  });

  it(`should logout the user if token is 'null' when running the autoLogin() method`, () => {
    localStorage.setItem('userData', JSON.stringify(new User('test email', 'test id', null, new Date(new Date().getTime() + 1000000))));
    spyOn(service, 'logout');
    service.autoLogin();
    expect(service.logout).toHaveBeenCalled();
  });

  it(`should logout the user if token is 'undefined' when running the autoLogin() method`, () => {
    localStorage.setItem('userData', JSON.stringify(new User('test email', 'test id', undefined, new Date(new Date().getTime() + 1000000))));
    spyOn(service, 'logout');
    service.autoLogin();
    expect(service.logout).toHaveBeenCalled();
  })

  it(`should login the user if account creation is successful`, () => {
    const handleAuthenticationSpy: any = spyOn<any>(service, 'handleAuthentication');
    service.createAccount('test email', 'test password')
      .subscribe(response => {
        expect(response).toBeTruthy();
      });

    // Order is important -- these lines must occur after the initial subscription
    const webAPIKey = 'AIzaSyAAC4JQbA0KOAL5RVMPyAIpp5XxWdnwRy8';
    const req = httpMock.expectOne('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + webAPIKey);
    expect(req.request.method).toBe('POST');
    req.flush({
      response: 'test response'
    });
    expect(handleAuthenticationSpy).toHaveBeenCalled();
  });

  it(`should login the user if username/email & password are correct`, () => {
    const handleAuthenticationSpy: any = spyOn<any>(service, 'handleAuthentication');
    service.login('test email', 'test password')
      .subscribe(response => {
        expect(response).toBeTruthy();
      });
    const webAPIKey = 'AIzaSyAAC4JQbA0KOAL5RVMPyAIpp5XxWdnwRy8';
    const req = httpMock.expectOne('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + webAPIKey);
    expect(req.request.method).toBe('POST');
    req.flush({
      response: 'test response'
    });
    expect(handleAuthenticationSpy).toHaveBeenCalled();
  });

});
