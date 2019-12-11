// @Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RxJS
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

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
  user = new Subject<User>();

  constructor(private http: HttpClient) { }

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
    this.user.next(user); // this is the important line used to login users
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
}
