import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      loginEmail: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.email])],
      loginPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(25)])]
    });
  }

  get loginEmail() {
    return this.loginForm.get('loginEmail');
  }
  get loginPassword() {
    return this.loginForm.get('loginpassword');
  }

  login() {
    // login logic here, probably call backend
    if(this.loginForm.valid) {
      console.log('Login sent!', this.loginForm.value);
    }
  }

}
