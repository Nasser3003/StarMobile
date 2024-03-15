import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PhonePipe } from '../pipes/phone.pipe';
import { AuthService } from '../services/auth.service';
import { Plan } from '../models/plan';
import { User } from '../models/user';
import { BackendService } from '../services/backend.service';
import { Device } from '../models/device';
import { Line } from '../models/line';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-plan-card',
    standalone: true,
    templateUrl: './plan-card.component.html',
    styleUrl: './plan-card.component.css',
    imports: [RouterLinkActive, RouterLink, CommonModule, PhonePipe]
})
export class PlanCardComponent {
  DefaultValues: BackendService = inject(BackendService);
  router = inject(Router);
  
  // citPlan: Plan = new Plan("Citizen", 25, 150, "galactic")
  // starPlan: Plan = new Plan("Starfighter", 20, 150, "universal")
  // droidPlan: Plan = new Plan("Droid", 100, 10000, "galactic")
  // larvaPlan: Plan = new Plan("Larval", 5, 10, "system")
  // lineList: string[] = ['5096270952', '0983427547'] //Removable. was for HW, same for phonePipe above

  currentUser: User = new User('', '', '', '','', '', []);

  isLoggedIn: boolean = false;
  
  addJustPlan(chosenPlan: Plan) {
    if(this.currentUser?.plans?.includes(chosenPlan)){
      console.log("addJustPlan: Plan already found")
    }
    else {
      this.DefaultValues.addPlan(chosenPlan.planType)
      console.log("addJustPlan: Plan added to account")
      this.router.navigate(["account"]);
    }
  }

  addPlanWithDevice(chosenPlan: Plan, chosenDevice: Device): void {
    if(this.currentUser!.plans!.includes(chosenPlan)){
      this.addLineWithDevice(chosenPlan, chosenDevice)
      // console.log('Plan already exists on current user');
      
    }
    else {
      console.log('Plan does not exist on current user');
      // await this.DefaultValues.addPlan(chosenPlan.planType)
      setTimeout(() => {
         this.DefaultValues.addPlan(chosenPlan.planType);
      }, 500);
      this.addLineWithDevice(chosenPlan, chosenDevice) // are we creating 2 plans here?
      
    }
  }

  addLineWithDevice(chosenPlan: Plan, chosenDevice: Device): void {
    console.log('IN BEGINNING OF ADD LINE WITH DEVICES' + chosenPlan.planType);
    
    this.DefaultValues.addLine(chosenPlan.planType);
    const linesArray = chosenPlan.getLinesArray;
    let lineDeviceGoesIn: Line;
    let lineNumber: string = "";

    // iterate through currentUser's plans' lines to find the first line that does have a number property but doesn't have a device
    for(let plan of this.currentUser!.plans!) {
      if(plan.planType === chosenPlan.planType) {
        for(let line of plan.lines!) {
          if(line.number !== null && line.device === null) {
            console.log('USER LINE NUMBER' + line.number);
            lineDeviceGoesIn = line;
            lineNumber = lineDeviceGoesIn.number;
            break;
          }
        }
      }
    }

    // for (let i = 0; i < linesArray.length; i++) {
    //   let a: Line = linesArray[i as keyof typeof linesArray];
    //   if (a.device !== null && a.device !== undefined) {
    //     lineNumber = (a.number);
    //   }
    // }
   console.log('IN END OF ADD LINE WITH DEVICES' + lineNumber + chosenDevice.brand + chosenDevice.model);
   
    // this.DefaultValues.addDevice(lineNumber, chosenDevice.brand, chosenDevice.model)
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

