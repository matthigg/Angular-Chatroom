import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';

// Models, Interfaces, Environment Variables
import { AuthResponseData } from '../models/auth-response-data';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

// Firestore
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  // Handle user authentication
  private handleAuthentication(
    userName: string,
    email: string, 
    userId: string, 
    token: string, 
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      userName,
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
    if (
      !errorResponse || 
      !errorResponse.error || 
      !errorResponse.error.error || 
      !errorResponse.error.error.message
    ) { return throwError(errorMessage) }
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
  autoLogin(): void {
    const userData: {
      name: string,
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return null;

    // Reconstruct the user from being strigified & stored in localStorage so 
    // that it regains the functionality of the token() getter
    const loadedUser = new User(
      userData.name,
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
    } else {
      this.logout();
    }
  }

  // Automatically logout user after tokenExpirationDate passes
  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // Check if username and/or email already exists in Firestore
  async checkIfUsernameOrEmailExists(userName: string, email: string): Promise<any> {
    let userNamesAndEmails: string[] = [];
    let usersSnapshot = firebase.firestore().collection('users').get();
    await usersSnapshot.then(response => {
      response.docs.map(doc => {
        Object.values(doc.data()).forEach(usernameOrEmail => userNamesAndEmails.push(usernameOrEmail))
      });
    });

    if (userNamesAndEmails.includes(userName) || userNamesAndEmails.includes(email)) {
      return new Promise((resolve, reject) => {
        reject('Username and/or email already exists.');
      })
    }
  }

  // Create a new account
  createAccount(userName: string, email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.firestore.firestore.collection('users').doc(email).set(
          {
            name: userName,
            email: email
          }
        );
        this.handleAuthentication(
          userName,
          email,
          response.user.uid,
          response.user.refreshToken,
          3600,
        );
        this.router.navigate(['/']);
      })
  }

  // Fetch username associated with a particular email address
  async fetchUserName(email: string) {
    let userName: string;
    await this.firestore.firestore.collection('users').doc(email).get()
      .then(response => userName = response.data().name)
    return userName
  }

  // Log in to an existing account
  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        const currentUser = firebase.auth().currentUser;
        const name = await this.fetchUserName(currentUser.email);
        this.handleAuthentication(
          name,
          currentUser.email,
          currentUser.uid,
          currentUser.refreshToken,
          3600,
        );
        this.router.navigate(['/']);
      })
  }

  // Log out of session
  logout(): void {
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.ngZone.run(() => this.router.navigate(['/auth']));
    this.user.next(null);
  }
}