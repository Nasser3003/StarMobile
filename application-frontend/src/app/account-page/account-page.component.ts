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
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, PhonePipe, FormsModule],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent {


  currentUser: User = new User('', '', '', '','', '', []);
  isLoggedIn: boolean = false;

  // totals for bill
  devicesTotal: number = 0;
  singlePlanTotal: number = 0;
  plansTotal: number = 0;
  billTotal: number = 0;

  // options for dropdowns
  options: { value: string, label: string }[] = [];
  selectedOption = '';
  
  
  constructor(private auth: AuthService, private backend: BackendService, private router: Router) {
    
    this.auth.currentUser.subscribe(user => {
      if(user !== undefined) {
        this.currentUser = user;
        if(this.isLoggedIn) {
          this.updateBill();
        }
      }
    });
    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    
    // update bill totals on page load if a logged in user is present in auth service
    this.generateOptions();
    
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

  addLine(plan: Plan) {
    // send planType to backend to add line to plan
    this.backend.addLine(plan.planType);

    // update bill totals
    this.updateBill();
  }

  removeLine(planType: string, phoneNumber: string) {
    // send planType and phoneNumber to backend to remove line from plan
    this.backend.removeLine(planType, phoneNumber);

    // update bill totals
    this.updateBill();
    

  }

  removeDevice(line: Line) {
    // Retrieve the phone number of the line
    let phoneNumber = line.number;
    // Retrieve the brand of the device
    let deviceBrand = line.device?.brand;
    // Retrieve the model of the device
    let deviceModel = line.device?.model;
    // Remove the device from the line with a call to the backend
    this.backend.removeDevice(phoneNumber, deviceBrand, deviceModel);
    // update the bill totals
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
        // add the plan's price to singlePlanTotal if not null
        if (plan !== null && plan.price !== null) {
          this.singlePlanTotal = plan.price * plan.lines!.length;
        }
        // if current user's line array is not empty, calculate the total cost of devices
        if (plan.lines?.length !== 0) {
          // for each line in the plan, add the device's price to the devicesTotal and also add the price of the line to the singlePlanTotal with plan.price (price per line)
          for(let line of plan.lines!) {
            // if device price is not null, add it to the devicesTotal
            if (line.device !== null && line.device.price !== null) {
              this.devicesTotal += line.device.price;
            }
          }
        }
        this.plansTotal += this.singlePlanTotal;
      }
    }
    this.billTotal = this.devicesTotal + this.plansTotal;
  }

  onSubmit(form: NgForm) {
    // Submit the form
  }

  changeLine() {

  }

  generateOptions() {
    this.options = this.currentUser.plans!.flatMap(plan => 
      plan.lines!.map(line => ({ value: line.number, label: `${line.number}` }))
    );
  }

  moveDevice(phoneNumber: string, brand: string, model: string, newLine: string) {
    this.backend.deviceLineChange(phoneNumber, brand, model, newLine);
  }

}
