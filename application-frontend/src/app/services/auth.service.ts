import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Plan } from '../models/plan';
import { Line } from '../models/line';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User>(new User('', '', '', '')); // default user
  currentUser = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();

  private usernameSubject = new BehaviorSubject<string>('');
  username = this.usernameSubject.asObservable();

  private plaintextpwSubject = new BehaviorSubject<string>('');
  plaintextpw = this.plaintextpwSubject.asObservable();

  router = inject(Router);

  apiUrl: string = environment.apiURL;
  loginRedirectUrl: string | null = null;
  accountRedirectUrl: string | null = null;

  constructor(private http: HttpClient) { }

  register(user: User) {
    this.setCurrentUser(user);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'No Auth'
    }
    this.http.post<any>(this.apiUrl + '/auth' + '/register', user, {observe: 'response', headers}).subscribe({
      next : data => {
        console.log('data returned from API register: ');
        console.log(data.body);
        this.setCurrentUser(data.body);
        // save username/password for future api calls while logged in
        this.usernameSubject.next(user.email);
        this.plaintextpwSubject.next(user.password);
      },
      error: err => console.log(err),
      complete: () => {
        console.log('User registered')
        console.log(this.currentUser);
        //  set status to logged in
        this.setIsLoggedIn(true);

        // redirect to account page
        const redirectUrl = this.accountRedirectUrl ? this.accountRedirectUrl: '/account';
        this.router.navigate([redirectUrl])
      }
    });
  }

  /**
   * Pass in email and password from login component
   * @param email 
   * @param password 
   */
  login(email: string, password: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${email}:${password}`)
    }
    this.http.post<any>(this.apiUrl + '/auth' + '/login', {'email': email, 'password': password}, {observe: 'response', headers}).subscribe({
      next : data => {
        // log and store user returned from API
        console.log('data returned from API login: ');
        console.log(data.body);
        this.setCurrentUser(data.body);
        // save username/password for future api calls while logged in
        this.usernameSubject.next(email);
        this.plaintextpwSubject.next(password);
      },
      error: err => console.log(err),
      complete: () => {
        console.log(`User logged in!`)
        console.log(this.currentUser);
        // set status to logged in
        this.setIsLoggedIn(true);
        // redirect user to account page
        const redirectUrl = this.accountRedirectUrl ? this.accountRedirectUrl: '/account';
        this.router.navigate([redirectUrl])
      }
    });
  }

  // Call these methods to update the current user and login state
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    console.log(`current user: ${this.currentUserSubject}`);
    
  }

  // updateCurrentUser() {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Basic ' + btoa(`${this.username}:${this.plaintextpw}`)
  //   };
  //   this.http.get<User>(this.apiUrl + '/user', {headers, observe: 'response'}).subscribe({
  //     next : data => {
  //       console.log('data returned from API get user: ');
  //       console.log(data.body);
  //       if(data.body !== null) {
  //         this.setCurrentUser(data.body);
  //       }
  //     },
  //     error: err => {
  //       console.log('Error updating user');
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('User updated');
  //     }
  //   }
  //   );
  // }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  /**
   * Sets AuthService logged in status to false / logs user out
   */
  logout(): void {
    const loggedoutUser: string = this.usernameSubject.value;
    // clear user and login status
    this.setIsLoggedIn(false);
    this.setCurrentUser(new User('', '', '', ''));
    // clear stored username and password
    this.usernameSubject.next('');
    this.plaintextpwSubject.next('');
    console.log(`User ${loggedoutUser} is now successfully and permanently logged out!`);
  }

}
