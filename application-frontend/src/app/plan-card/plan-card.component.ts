import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PhonePipe } from '../pipes/phone.pipe';

@Component({
    selector: 'app-plan-card',
    standalone: true,
    templateUrl: './plan-card.component.html',
    styleUrl: './plan-card.component.css',
    imports: [CommonModule, PhonePipe]
})
export class PlanCardComponent {

  lineList: string[] = ['5096270952', '0983427547']

}
