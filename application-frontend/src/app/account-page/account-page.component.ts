import { Component } from '@angular/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Device } from '../models/device';
import { PhonePipe } from '../pipes/phone.pipe';
import { Plan } from '../models/plan';
import { Line } from '../models/line';
import { OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, PhonePipe],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {


  currentUser: User | null = null;
  isLoggedIn: boolean = false;

  // totals for bill
  devicesTotal: number = 0;
  plansTotal: number = 0;
  billTotal: number = 0

  // TEST OBJECTS///////////////////////////////////////////////////////
  // testDevice: Device = 
  //   {brand: 'samsung', model: 'phone', description: 'A phone.', price: 25, picturePath: './assets/imgs/devices/nobez.jpeg'};

  // subscribe to auth service's stored current user and logged in status
    ngOnInit(): void {
      this.auth.currentUser.subscribe(user => {
        if(user !== null) {
          this.currentUser = user;
        }
      });
      this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    }
    
  constructor(private auth: AuthService, private backend: BackendService, private router: Router) {

    // this.auth.isLoggedIn.subscribe(data => {
    //   this.isLoggedIn = data;
    // })

    // INITIALIZE TEST OBJECTS///////////////////////////////////////////////////////
    // this.currentUser.id = 1;
    // this.currentUser.plans = [
    //   {
    //   planType: 'Galactic',
    //   price: 50,
    //   quota: 100,
    //   signalRange: '100Mbps',
    //   user: this.currentUser,
    //   lines: [
    //     {number: '1234567890', device: this.testDevice},
    //     {number: '1234567890', device: this.testDevice}
    //   ]
    //   },
    //   {
    //   planType: 'Galactic',
    //   price: 50,
    //   quota: 100,
    //   signalRange: '100Mbps',
    //   user: this.currentUser,
    //   lines: [
    //     {number: '1234567890', device: this.testDevice},
    //     {number: '1234567890', device: this.testDevice}
    //   ]
    //   }
    // ];

    //////////////////////////////////////////////////////////////////////////////////////////////

    // update bill totals on page load if a logged in user is present in auth service
    if(this.currentUser !== null) {
      this.updateBill();
    }
    
  }

  removePlan(i: number) {
    // remove plan from user
    this.currentUser!.plans?.splice(i, 1);
    // send user edit to backend

  

    // update bill totals
    this.updateBill();
  }

  removeLine(planIndex: number, lineIndex: number) {
    // remove line from plan
    this.currentUser!.plans![planIndex].lines?.splice(lineIndex, 1);
    // send plan edit to backend


    // update bill totals
    this.updateBill();
  }

  updateBill() {
    this.devicesTotal = 0;
    this.plansTotal = 0;
    this.billTotal = 0;
    for (let plan of this.currentUser!.plans!) {
      for(let line of plan.lines!) {
        this.devicesTotal += line.device.price;
      }
      this.plansTotal += plan.price;
    }
    this.billTotal = this.devicesTotal + this.plansTotal;
  }

  changeLine() {

  }

}
