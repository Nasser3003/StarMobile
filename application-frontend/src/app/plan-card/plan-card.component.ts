import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PhonePipe } from '../pipes/phone.pipe';
import { AuthService } from '../services/auth.service';
import { Plan } from '../models/plan';
import { User } from '../models/user';
import { BackendService } from '../services/backend.service';

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

  currentUser: User | null = null;
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.auth.currentUser.subscribe(user => {
      if(user !== null) {
        this.currentUser = user;
      }
    });
    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  // listOfAvailablePlansDefault: Plan[] = [this.citPlan, this.starPlan, this.droidPlan, this.larvaPlan];
  listOfAvailablePlansDefault: Plan[] = this.DefaultValues.allPlans;

  constructor(private auth: AuthService) {

  }
}

