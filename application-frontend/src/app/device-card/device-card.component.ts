import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Device } from '../models/device';
import { Line } from '../models/line';
import { Plan } from '../models/plan';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-device-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.css'
})
export class DeviceCardComponent {
  DefaultValues: BackendService = inject(BackendService);

  // phone1: Device = new Device("BlackHoleBerry", "revolutionary", 1, "3 Pro", 299, new Line(0, , 'no'), new Plan("Citizen", 25, 150, "galactic"))
  // phone2: Device = new Device("Quantum", "singular", 1, "1x", 399, new Line(0, 0, 'no'), new Plan("Citizen", 25, 150, "galactic"))
  // phone3: Device = new Device("Ploklok", "alien", 1, "Ashen Nightmare 3", 123, new Line(0, 0, 'no'), new Plan("Citizen", 25, 150, "galactic"))
  // phone4: Device = new Device("Hive", "for the wide-minded", 1, "Million 8", 3000, new Line(0, 0, 'no'), new Plan("Citizen", 25, 150, "galactic"))
  // listOfDefaultDevices: Device[] = [this.phone1, this.phone2, this.phone3, this.phone4]


}
