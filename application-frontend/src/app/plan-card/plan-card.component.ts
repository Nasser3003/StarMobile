import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PhonePipe } from '../pipes/phone.pipe';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-plan-card',
    standalone: true,
    templateUrl: './plan-card.component.html',
    styleUrl: './plan-card.component.css',
    imports: [CommonModule, PhonePipe]
})
export class PlanCardComponent {
  LoginStatus: AuthService = inject(AuthService);

  lineList: string[] = ['5096270952', '0983427547']

}
