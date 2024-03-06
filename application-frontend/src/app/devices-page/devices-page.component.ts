import { Component } from '@angular/core';
import { DeviceCardComponent } from "../device-card/device-card.component";

@Component({
    selector: 'app-devices-page',
    standalone: true,
    templateUrl: './devices-page.component.html',
    styleUrl: './devices-page.component.css',
    imports: [DeviceCardComponent]
})
export class DevicesPageComponent {

}
