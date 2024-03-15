import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Device } from '../models/device';
import { Line } from '../models/line';
import { Plan } from '../models/plan';
import { BackendService } from '../services/backend.service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-device-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.css'
})
export class DeviceCardComponent {

  currentUser: User = new User('', '', '', '','', '', []);
  isLoggedIn: boolean = false;

  DefaultValues: BackendService = inject(BackendService);
  
  constructor(private backend: BackendService, private auth: AuthService) {
    this.auth.currentUser.subscribe(user => {
      if(user !== undefined) {
        this.currentUser = user;
      }
    });
    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

  }

  addDevice(deviceToAdd: Device) {
    // Check that user is logged in; if not, display a modal that prompts the user to log in
    if(!this.isLoggedIn) {
      //-----modal code here--------
      return;
    }
    // Retrieve the current user's array of plans
    let userPlans = this.currentUser.plans;

    // If the user has no plans, display a modal that prompts the user to add a plan
    if(userPlans!.length === 0) {
      //-----modal code here--------
      return;
    }

    // Iterate through the plans array, to find a plan that has a line with no device assigned
    for (let plan of userPlans!) {
      console.log("Searching " + plan.planType + " for a line with no device");
      for (let line of plan.lines!) {
        console.log("Checking line " + line.number + " for an empty device slot");
        // If a line with no device is found, add a device to that line
        if (line.device === null) {
          console.log("Adding device to line " + line.number);
          // call backend service to add device to line
          this.backend.addDevice(line.number, deviceToAdd.brand, deviceToAdd.model);
          return;
        }else {
          continue;
        }
    }

  }

  // If no plan is found with a line that has no device, display a modal that prompts the user to add a plan
  //-----modal code here--------
  
}
// phone1: Device = new Device("BlackHoleBerry", "revolutionary", 1, "3 Pro", 299, new Line(0, , 'no'), new Plan("Citizen", 25, 150, "galactic"))
// phone2: Device = new Device("Quantum", "singular", 1, "1x", 399, new Line(0, 0, 'no'), new Plan("Citizen", 25, 150, "galactic"))
// phone3: Device = new Device("Ploklok", "alien", 1, "Ashen Nightmare 3", 123, new Line(0, 0, 'no'), new Plan("Citizen", 25, 150, "galactic"))
// phone4: Device = new Device("Hive", "for the wide-minded", 1, "Million 8", 3000, new Line(0, 0, 'no'), new Plan("Citizen", 25, 150, "galactic"))
// listOfDefaultDevices: Device[] = [this.phone1, this.phone2, this.phone3, this.phone4]
}
