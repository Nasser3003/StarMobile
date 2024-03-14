import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login';
import * as bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  backend = inject(BackendService);

  // current logged in user and login state
  currentUser: User = new User('', '', '', '','', '', []);
  isLoggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router,/* private backend: BackendService*/) {
    this.auth.currentUser.subscribe(user => {
      if(user !== undefined) {
        this.currentUser = user;
      }
    });
    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

    // build the login form with validators
    this.loginForm = this.formBuilder.group({
      loginEmail: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.email])],
      loginPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(25)])]
    });

  }

  get loginEmail() {
    return this.loginForm.get('loginEmail');
  }
  get loginPassword() {
    return this.loginForm.get('loginPassword');
  }

  login() {
    // login logic here, call backend
    if(this.loginForm.valid) {
            // send login info to authentication service
            this.auth.login(this.loginEmail!.value, this.loginPassword!.value);
            console.log('Login sent to auth!', this.loginForm.value);
    }



    if (this.isLoggedIn) {
      const redirectUrl = this.auth.accountRedirectUrl
      ? this.auth.accountRedirectUrl: '/account';
      this.router.navigate([redirectUrl])
    };

    }
}