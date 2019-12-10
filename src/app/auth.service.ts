import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RxJS
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  constructor(private http: HttpClient) { }

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
      .pipe(catchError(this.handleError));
    }

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
      .pipe(catchError(this.handleError));
  }
}
