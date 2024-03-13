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
  currentUser: User = new User('', '', '', '');
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {
    this.auth.currentUser.subscribe(user => {
      if(user !== undefined) {
        this.currentUser = user;
      }
    });
    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  logout() {
    this.auth.logout();
  }


}
