import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected isLoggedIn = false;
  apiUrl: string = environment.apiURL;
  loginRedirectUrl: string | null = null;
  accountRedirectUrl: string | null = null;

  login(email: string, password: string): Observable<User> {
    // return of(true).pipe(delay(1000), tap(() => (this.isLoggedIn = true)));
    return this.http.post<User>('login', {email, password})
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  getIsLoggedIn() : boolean {
    return this.isLoggedIn;
  }

  constructor(private http: HttpClient) { }
}
