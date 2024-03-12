import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  protected isLoggedIn = false;

  // isLoggedInRaw: boolean = false;
  // isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedInRaw)
  // isLoggedIn = this.isLoggedInSubject.asObservable();

  storedUser = new User('','','','');

  apiUrl: string = environment.apiURL;
  loginRedirectUrl: string | null = null;
  accountRedirectUrl: string | null = null;

  constructor(private http: HttpClient) { }

  register(user: User) {
    this.storedUser = user;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'No Auth'
    }
    this.http.post<any>(this.apiUrl + '/auth' + '/register', user, {observe: 'response', headers}).subscribe({
      next : data => {
        console.log(data.body.data);
        this.storedUser = data.body.data;
      },
      error: err => console.log(err),
      complete: () => {
        console.log('User registered')
        this.isLoggedIn = true;
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
        console.log(data.body.data);
        this.storedUser = data.body.data;
      },
      error: err => console.log(err),
      complete: () => {
        console.log('User registered')
        // set status to logged in
        this.isLoggedIn = true;
      }
    });
  }

  /**
   * Sets AuthService logged in status to false / logs user out
   */
  logout(): void {
    this.isLoggedIn = false;
  }

  /**
   * 
   * @returns AuthService login state to other components when called
   */
  getIsLoggedIn() : boolean {
    return this.isLoggedIn;
  }

}
