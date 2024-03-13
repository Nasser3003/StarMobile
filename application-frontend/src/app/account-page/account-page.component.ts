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


  currentUser: User = new User('', '', '', '');
  isLoggedIn: boolean = false;
  plaintextpw: string = '';

  // totals for bill
  devicesTotal: number = 0;
  plansTotal: number = 0;
  billTotal: number = 0;
    
  constructor(private auth: AuthService, private backend: BackendService, private router: Router) {

    this.auth.currentUser.subscribe(user => {
      if(user !== undefined) {
        this.currentUser = user;
      }
    });
    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.auth.plaintextpw.subscribe(plaintextpw => this.plaintextpw = plaintextpw);

    // update bill totals on page load if a logged in user is present in auth service
    if(this.isLoggedIn) {
      this.updateBill();
    }
    
  }

  removePlan(plan: Plan) {
    // send planType to backend to remove plan from user
    this.backend.removePlan(plan.planType);

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
    if(!this.isLoggedIn) {
      this.devicesTotal = 0;
      this.plansTotal = 0;
      this.billTotal = 0;
      return;
    }
    // if current user's plan array is not empty, calculate the total cost of devices and plans
    if(this.currentUser.plans?.length !== 0){
      for (let plan of this.currentUser!.plans!) {
        // add the plan's price to the plansTotal if not null
        if (plan.price !== null) {
          this.plansTotal += plan.price;
        }
        // if current user's line array is not empty, calculate the total cost of devices
        if (plan.lines?.length !== 0) {
          // for each line in the plan, add the device's price to the devicesTotal
          for(let line of plan.lines!) {
            // if device price is not null, add it to the devicesTotal
            if (line.device.price !== null) {
              this.devicesTotal += line.device.price;
            }
        }
        }
      }
    }
    this.billTotal = this.devicesTotal + this.plansTotal;
  }

  changeLine() {

  }

  createTestUser() {
        // TEST OBJECTS///////////////////////////////////////////////////////
        this.auth.setCurrentUserTest(new User('XXXXXXXXXXXXX', 'Test', 'User', 'test'));
        //////////////////////////////////////////////////////////////////////////////////////////////
        this.updateBill();
  }

}
