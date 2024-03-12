import { Component } from '@angular/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Device } from '../models/device';
import { PhonePipe } from '../pipes/phone.pipe';
// import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, PhonePipe],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {


  currentUser: User = new User('test@test.com','Joe','Shmoe','password123')
  isLoggedIn: boolean = false;

  // totals for bill
  devicesTotal: number = 0;
  plansTotal: number = 0;
  billTotal: number = 0
  
  constructor(private auth: AuthService, /*private backend: BackendService, */private router: Router) {
    // this.auth.isLoggedIn.subscribe(data => {
    //   this.isLoggedIn = data;
    // })
    // this.currentUser.id = 1; // for test
    // this.currentUser.devices = [{
    //   brand: "samsung",
    //       description: "a really cool phone",
    //       id: 1,
    //       model: "galaxy",
    //       price: 20.00,
    //       line: {id: 1, device: undefined, number: '5096270952'},
    //       plan: undefined
    // },
    // {
    //   brand: "apple",
    //       description: "a really fruit phone",
    //       id: 2,
    //       model: "iphone",
    //       price: 1000.00,
    //       line: {deviceID: 2, id: 2, number: '5096281111'},
    //       plan: {id: 1,
    //         planType: 1,
    //         price: 25.00,
    //         quota: 100,
    //         signalRange: 'galactic'}
    // }];
    // for (let device of this.currentUser.devices) {
    //   this.devicesTotal += device.price;
    //   this.plansTotal += device.plan.price;
    // }
    this.billTotal = this.devicesTotal + this.plansTotal;
  }

  removeDevice(device: Device, index: number) {
    // remove device from user
    this.currentUser.devices?.splice(index, 1);

    // send user edit to backend
    // this.backend.editUser(this.currentUser.id!, this.currentUser);

    // update bill totals
    // this.devicesTotal -= device.price;
    // this.plansTotal -= device.plan.price;
    // this.billTotal = this.devicesTotal + this.plansTotal;
  }

  changePlan(device: Device) {
    
  }

  changeLine() {

  }

}
