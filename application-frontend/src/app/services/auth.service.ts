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

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();

  // protected isLoggedIn = false;

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
        console.log(data.body);
        this.setCurrentUser(data.body);
      },
      error: err => console.log(err),
      complete: () => {
        console.log('User registered')

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
        console.log('data returned from API login: ')
        console.log(data.body);
        this.setCurrentUser(data.body);
      },
      error: err => console.log(err),
      complete: () => {
        console.log('User logged in!')
        console.log(this.currentUserSubject);
        // set status to logged in
        this.setIsLoggedIn(true);
        // redirect to account page
        const redirectUrl = this.accountRedirectUrl ? this.accountRedirectUrl: '/account';
        this.router.navigate([redirectUrl])
      }
    });
  }

  // Call these methods to update the current user and login state
  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }

  // Change the current user to a test user
  setCurrentUserTest(user: User | null): void {
    // Test device
    const testDevice: Device = 
        {brand: 'samsung', model: 'phone', description: 'A phone.', price: 25, picturePath: './assets/imgs/devices/nobez.jpeg'};
    // add plans to arg user
    user!.plans = [new Plan('test plan', 50, 25, 'FAR')];
    // add line to test plan
    user!.plans[0].lines = [new Line(1, testDevice, '5096270952')];
    this.currentUserSubject.next(user);
    console.log("current user:");
    console.log(this.currentUser);
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }

  /**
   * Sets AuthService logged in status to false / logs user out
   */
  logout(): void {
    this.setIsLoggedIn(false);
    this.setCurrentUser(null);
    console.log('User logged out!');
  }

}
