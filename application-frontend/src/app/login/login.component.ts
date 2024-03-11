import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../interfaces/login';
import * as bcrypt from 'bcryptjs';
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

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private backend: BackendService) {
    // build the login form with validators
    this.loginForm = this.formBuilder.group({
      loginEmail: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.email])],
      loginPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(25)])]
    });
    // If user is logged in, redirect to account page
    if (auth.isLoggedIn) {
      const redirectUrl = this.auth.accountRedirectUrl
      ? this.auth.accountRedirectUrl: '/account';
      this.router.navigate([redirectUrl]);
    }
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

        // hash the password
        bcrypt.hash(this.loginPassword!.value, 10, (err, hash) => {

          // check if err is truthy
          if (err) {
            // handle error
            console.error(err); // log the error to the console

            // uncomment this if we get time to add a messageService
            // display a message to the user
            // this.messageService.add({severity:'error', summary:'Error', detail:'Something went wrong. Please try again.'});

            // throw an exception
            throw new Error('Bcrypt hashing failed');
          } else {
            // send login info to authentication service
            this.auth.login(this.loginEmail!.value, hash);
          }
        });

      // this.auth.login().subscribe(() => {
      //   if (this.auth.isLoggedIn) {
      //     const redirectUrl = this.auth.accountRedirectUrl
      //     ? this.auth.accountRedirectUrl: '/account';
      //     this.router.navigate([redirectUrl])
      //   }
      // });

      console.log('Login sent to auth!', this.loginForm.value);
    }
  }

}
