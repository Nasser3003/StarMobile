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

  isLoggedInRaw: boolean = false;
  isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.isLoggedInRaw)
  isLoggedIn = this.isLoggedInSubject.asObservable();

  responseUser = new User('','','','');


  apiUrl: string = environment.apiURL;
  loginRedirectUrl: string | null = null;
  accountRedirectUrl: string | null = null;

  constructor(private http: HttpClient) { }

  register(user: User) {
    this.http.post<any>(this.apiUrl + 'user', user, {observe: 'response'}).subscribe({
      next : data => this.responseUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('User registered')
    });
  }

  login(email: string, hashedpw: string) {

  }

  logout(): void {
    this.isLoggedInRaw = false;
  }

}
