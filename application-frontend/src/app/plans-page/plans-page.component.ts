import { Component } from '@angular/core';
import { PlanCardComponent } from "../plan-card/plan-card.component";

@Component({
    selector: 'app-plans-page',
    standalone: true,
    templateUrl: './plans-page.component.html',
    styleUrl: './plans-page.component.css',
    imports: [PlanCardComponent]
})
export class PlansPageComponent {

}
