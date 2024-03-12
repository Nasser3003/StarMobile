import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    imports: [LoginComponent, RegisterComponent, CommonModule]
})
export class LoginPageComponent {

      // current logged in user and login state
  currentUser: User | null = null;
  isLoggedIn: boolean = false;

  // subscribe to auth service's stored current user and logged in status
  ngOnInit(): void {
    this.auth.currentUser.subscribe(user => {
      if(user !== null) {
        this.currentUser = user;
      }
    });
    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }


}
