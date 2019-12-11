import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

// Models, Interfaces
import { User } from './shared/user.model';
interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  // Handle user authentication
  private handleAuthentication(
    email: string, 
    userId: string, 
    token: string, 
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email, 
      userId,
      token,
      expirationDate
    );

    // Log in a user & store their information in localStorage
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // Handle login and authentication errors
  private handleError(errorResponse) {
    let errorMessage = 'An unknown error occurred.';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email has already been registered.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found.';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'Email is invalid.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is invalid.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This account has been disabled by an administrator.'
        break;
    }
    return throwError(errorMessage);
  }

  // Automatically log in user if user data exists in localStorage
  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) { return; }

    // Reconstruct the user so that it has access to the token() getter
    const loadedUser = new User(
      userData.email, 
      userData.id, 
      userData._token, 
      new Date(userData._tokenExpirationDate)
    );

    // Check that user token exists and has not expired, and if so then log in
    // the user
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration);
    }
  }

  // Automatically log user out after tokenExpirationDate passes
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // Create a new account
  createAccount(email: string, password: string) {
    const webAPIKey = 'AIzaSyAAC4JQbA0KOAL5RVMPyAIpp5XxWdnwRy8';
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + webAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError), 
        tap(response => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn,
          );
        })
      );
  }

  // Log in to an existing account
  login(email: string, password: string) {
    const webAPIKey = 'AIzaSyAAC4JQbA0KOAL5RVMPyAIpp5XxWdnwRy8';
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + webAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn,
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/']);
  }
}
