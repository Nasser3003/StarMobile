import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PhonePipe } from '../pipes/phone.pipe';
import { AuthService } from '../services/auth.service';
import { Plan } from '../models/plan';

@Component({
    selector: 'app-plan-card',
    standalone: true,
    templateUrl: './plan-card.component.html',
    styleUrl: './plan-card.component.css',
    imports: [CommonModule, PhonePipe]
})
export class PlanCardComponent {
  LoginStatus: AuthService = inject(AuthService);

  citPlan: Plan = new Plan("Citizen", 25, 150, "galactic")
  starPlan: Plan = new Plan("Starfighter", 20, 150, "universal")
  droidPlan: Plan = new Plan("Droid", 100, 10000, "galactic")
  larvaPlan: Plan = new Plan("Larval", 5, 10, "system")

  listOfAvailablePlansDefault: Plan[] = [this.citPlan, this.starPlan, this.droidPlan, this.larvaPlan];

  // lineList: string[] = ['5096270952', '0983427547'] //Removable. was for HW, same for phonePipe above

}

