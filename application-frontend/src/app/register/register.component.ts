import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor (private formBuilder: FormBuilder, private backend: BackendService) {
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
      console.log('Registration sent!', this.registerForm.value);
    }
  }

}
