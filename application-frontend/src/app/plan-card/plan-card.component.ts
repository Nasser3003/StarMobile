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

