// @Angular
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { AuthService } from './auth.service';

// Models
import { User } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should store user information in localStorage when handleAuthentication() is invoked`, () => {
    service['handleAuthentication']('test email', 'test userId', 'test token', 0);
    expect(localStorage.getItem('userData')).toBeTruthy();
  });

});
