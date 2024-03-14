import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PhonePipe } from '../pipes/phone.pipe';
import { AuthService } from '../services/auth.service';
import { Plan } from '../models/plan';
import { User } from '../models/user';
import { BackendService } from '../services/backend.service';
import { Device } from '../models/device';
import { Line } from '../models/line';

@Component({
    selector: 'app-plan-card',
    standalone: true,
    templateUrl: './plan-card.component.html',
    styleUrl: './plan-card.component.css',
    imports: [CommonModule, PhonePipe]
})
export class PlanCardComponent {
  DefaultValues: BackendService = inject(BackendService);

  // citPlan: Plan = new Plan("Citizen", 25, 150, "galactic")
  // starPlan: Plan = new Plan("Starfighter", 20, 150, "universal")
  // droidPlan: Plan = new Plan("Droid", 100, 10000, "galactic")
  // larvaPlan: Plan = new Plan("Larval", 5, 10, "system")
  // lineList: string[] = ['5096270952', '0983427547'] //Removable. was for HW, same for phonePipe above

  currentUser: User = new User('', '', '', '');
  isLoggedIn: boolean = false;

  addPlanWithDevice(chosenPlan: Plan, chosenDevice: Device): void {
    if(this.DefaultValues.allPlans.includes(chosenPlan)){
      this.addLineWithDevice(chosenPlan, chosenDevice)
    }
    else {
      this.DefaultValues.addPlan(chosenPlan.planType)
      this.addLineWithDevice(chosenPlan, chosenDevice)
    }
  }

  addLineWithDevice(chosenPlan: Plan, chosenDevice: Device): void {
    this.DefaultValues.addPlan(chosenPlan.planType)
    this.DefaultValues.addLine(chosenPlan.planType)
    const linesArray = chosenPlan.getLinesArray;
    let lineDeviceGoesIn: Line;
    let lineNumber: string = "";
    for (let i = 0; i < linesArray.length; i++) {
      let a: Line = linesArray[i as keyof typeof linesArray];
      if (a.device !== null && a.device !== undefined) {
        lineNumber = (a.number);
      }
    }
   
    this.DefaultValues.addDevice(lineNumber, chosenDevice.brand, chosenDevice.model)
  }

  testAddPlan() {
    this.DefaultValues.addPlan("Citizen")
  }

  // listOfAvailablePlansDefault: Plan[] = [this.citPlan, this.starPlan, this.droidPlan, this.larvaPlan];
  listOfAvailablePlansDefault: Plan[] = this.DefaultValues.allPlans;

  constructor(private auth: AuthService) {

    this.auth.currentUser.subscribe(user => {
      if(user !== null) {
        this.currentUser = user;
      }
    });
    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

  }
}

