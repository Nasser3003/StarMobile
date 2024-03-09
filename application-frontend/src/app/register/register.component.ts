import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import * as bcrypt from 'bcryptjs';

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
      this.newUser.email = this.registerEmail?.value;
      this.newUser.first_name = this.registerFirstName?.value;
      this.newUser.last_name = this.registerLastName?.value;

      // hash the password
      bcrypt.hash(this.registerPassword!.value, 10, (err, hash) => {

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
          // assign the password
          this.newUser.password = hash;
          // send the user to backend
          this.backend.register(this.newUser);
          console.log('Registration sent!', this.registerForm.value);
        }
      });
    }
  }

}
