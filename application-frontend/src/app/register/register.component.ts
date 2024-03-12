import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { BackendService } from '../services/backend.service';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  newUser: User = new User('','','','')
  hashedPw: string = '';

  constructor (private formBuilder: FormBuilder,/* private backend: BackendService, */private auth: AuthService) {
    this.registerForm = this.formBuilder.group({
      registerEmail: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.email])],
      registerPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(25)])],
      registerFirstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
      registerLastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
    })
  }

  get registerEmail() {
    return this.registerForm.get('registerEmail');
  }
  get registerPassword() {
    return this.registerForm.get('registerPassword');
  }
  get registerFirstName() {
    return this.registerForm.get('registerFirstName');
  }
  get registerLastName() {
    return this.registerForm.get('registerLastName');
  }

  register() {
    // registration logic here - call on backend to send POST
    if(this.registerForm.valid) {
      this.newUser.email = this.registerEmail?.value;
      this.newUser.password = this.registerPassword?.value;
      this.newUser.firstName = this.registerFirstName?.value;
      this.newUser.lastName = this.registerLastName?.value;

      // send the user to AuthService
      this.auth.register(this.newUser);
      console.log('Registration sent!', this.newUser);
    }
  }
}
  


