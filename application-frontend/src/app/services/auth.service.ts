import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  loginRedirectUrl: string | null = null;
  accountRedirectUrl: string | null = null;

  login(): Observable<boolean> {
    return of(true).pipe(delay(1000), tap(() => (this.isLoggedIn = true)));
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  constructor() { }
}
