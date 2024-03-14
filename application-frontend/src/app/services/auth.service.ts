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

  currentUserRaw: User = new User('', '', '', '','', '', []);
  currentUserSubject = new BehaviorSubject<User>(this.currentUserRaw); // default user
  currentUser = this.currentUserSubject.asObservable();

  isLoggedInRaw: boolean = false;
  isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedInRaw);
  isLoggedIn = this.isLoggedInSubject.asObservable();

  usernameRaw: string = '';
  usernameSubject = new BehaviorSubject<string>(this.usernameRaw);
  username = this.usernameSubject.asObservable();

  plaintextpwRaw: string = '';
  plaintextpwSubject = new BehaviorSubject<string>(this.plaintextpwRaw);
  plaintextpw = this.plaintextpwSubject.asObservable();

  router = inject(Router);

  apiUrl: string = environment.apiURL;
  loginRedirectUrl: string | null = null;
  accountRedirectUrl: string | null = null;

  constructor(private http: HttpClient) { }

  register(user: User) {
    // this.setCurrentUser(user);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'No Auth'
    }
    this.http.post<any>(this.apiUrl + '/auth' + '/register', user, {observe: 'response', headers}).subscribe({
      next : data => {
        console.log('data returned from API register: ');
        console.log(data.body);
        this.setCurrentUser(this.constructUserFromResponse(data.body));
        // save username/password for future api calls while logged in
        this.usernameSubject.next(user.email);
        this.plaintextpwSubject.next(user.password);
      },
      error: err => console.log(err),
      complete: () => {
        console.log('User registered');
        // console.log("Current User:" + JSON.stringify(this.currentUser));
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
        this.setCurrentUser(this.constructUserFromResponse(data.body));
        // save username/password for future api calls while logged in
        this.usernameSubject.next(email);
        this.plaintextpwSubject.next(password);
      },
      error: err => console.log(err),
      complete: () => {
        console.log(`User logged in!`)
        // console.log("Current User:" + JSON.stringify(this.currentUser));
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
    console.log('Current user before change: ' +
          'email: ' + this.currentUserRaw.email +
          'firstname: ' + this.currentUserRaw.firstName +
          'lastname: ' + this.currentUserRaw.lastName+
          'id: ' + this.currentUserRaw.id+
          'password: ' + this.currentUserRaw.password+
          'username: ' + this.currentUserRaw.username);
    
    this.logUserPlans();
    
    
    console.log('Setting current user to: ' +
          'email: ' + user.email +
          'firstname: ' + user.firstName +
          'lastname: ' + user.lastName+
          'id: ' + user.id+
          'password: ' + user.password+
          'username: ' + user.username);

          this.currentUserRaw = user;
          this.currentUserSubject.next(this.currentUserRaw);

          console.log('Current user after: ' +
                'email: ' + this.currentUserRaw.email +
                'firstname: ' + this.currentUserRaw.firstName +
                'lastname: ' + this.currentUserRaw.lastName+
                'id: ' + this.currentUserRaw.id+
                'password: ' + this.currentUserRaw.password+
                'username: ' + this.currentUserRaw.username);
          this.logUserPlans;
          
    
  }

  logUserPlans() {
    for(let plan of this.currentUserRaw.plans!) {
      console.log(plan.planType);
      console.log(`Number of lines on ${plan.planType}: ${plan.lines?.length}`);
      
    }
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
    this.isLoggedInRaw = isLoggedIn;
    this.isLoggedInSubject.next(this.isLoggedInRaw);
  }

  /**
   * Sets AuthService logged in status to false / logs user out
   */
  logout(): void {
    const loggedoutUser: string = this.usernameSubject.value;
    // clear user and login status
    this.setIsLoggedIn(false);
    this.setCurrentUser(new User('', '', '', '','', '', []));
    // clear stored username and password
    this.usernameRaw = '';
    this.usernameSubject.next(this.usernameRaw);
    this.plaintextpwRaw = '';
    this.plaintextpwSubject.next(this.plaintextpwRaw);
    console.log(`User ${loggedoutUser} is now successfully and permanently logged out!`);
  }

  constructUserFromResponse(responseBody: any): User {
    // Extract the properties you need from responseBody
    const { id, firstName, lastName, email, username, password, plans } = responseBody;
  
    // Construct a User object
    const user = new User(id, firstName, lastName, email, username, password, plans);
  
    return user;
  }

  // logCurrentUser() {
  //   console.log(this.currentUserSubject.);
    
  // }

}
