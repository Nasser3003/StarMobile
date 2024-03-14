import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Device } from '../models/device';
import { Line } from '../models/line';
import { Plan } from '../models/plan';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseURL = environment.apiURL;

  // current user, logged in status, username, and password and from auth service
  currentUser: User = new User('', '', '', '');
  isLoggedIn: boolean = false;
  username: string = '';
  plaintextpw: string = '';

  // allDevices: Device[] = [];
  dev1: Device = new Device("Ploklok", "Ashen Nightmare 3", "Starliner class phone from Ploklok.", 1300, "")
  dev2: Device = new Device("Ploklok", "Ashen Daydream 3", "Liner class phone from Ploklok.", 300, "")
  dev3: Device = new Device("Quantum", "1x", "A singular phone from Quantum.", 1200, "")
  dev4: Device = new Device("Quantum", "1", "Another singular phone from Quantum.", 400, "")
  dev5: Device = new Device("BlackHoleBerry", "3 pro", "BlackHoleBerry from beyond the horizon", 700, "")
  dev6: Device = new Device("BlackHoleBerry", "3 no", "BlackHoleBerry at the cutting edge.", 450, "")
  dev7: Device = new Device("Hive", "Billion 8", "Say Hive to a billion.", 1300, "")
  dev8: Device = new Device("Hive", "Million 8", "Say Hive to a million.", 1300, "")
  allDevices: Device[] = [this.dev1, this.dev2, this.dev3, this.dev4, this.dev5, this.dev6, this.dev7, this.dev8]

  updatedLine: Line | undefined = undefined;

  updatedPlan: Plan | undefined = undefined;

  // allPlans: Plan[] = [];
  citPlan: Plan = new Plan("Citizen", 25, 150, "galactic")
  starPlan: Plan = new Plan("Starfighter", 20, 150, "universal")
  droidPlan: Plan = new Plan("Droid", 100, 10000, "galactic")
  larvaPlan: Plan = new Plan("Larval", 5, 10, "system")
  allPlans: Plan[] = [this.citPlan, this.starPlan, this.droidPlan, this.larvaPlan];


  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.currentUser.subscribe(user => {
      if(user !== undefined) {
        this.currentUser = user;
      }
    });
    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.auth.username.subscribe(username => this.username = username);
    this.auth.plaintextpw.subscribe(plaintextpw => this.plaintextpw = plaintextpw);
  }

  getHeader() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.plaintextpw}`)
    }
  }

//   ///////////////
//   /////USERS/////
//   ///////////////



//   /////////////////
//   /////DEVICES/////
//   /////////////////

/**
 * Get all devices from the backend
 */
  // getAllDevices() {
  //   const headers = this.getHeader();
  //   this.http.get<any>(this.baseURL + '/device' + '/all', {observe: 'response'}).subscribe({
  //     next : data => {
  //       console.log("Requesting all devices");
  //       console.log(data.body);
  //       this.allDevices = data.body;
  //     },
  //     error: err => {
  //       console.log('Error retrieving devices');
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('All devices retrieved');
  //     }
  //   });
  // }

  /**
   * Add a device to the current user
   * @param phoneNumber 
   * @param brand 
   * @param model 
   * @returns an updated line that can replace the existing one in the current user's lines array
   */
  addDevice(phoneNumber: string, brand: string, model: string): Line | undefined{
  const headers = this.getHeader();
  this.http.post<any>(this.baseURL + '/device' + '/add', { "number" : phoneNumber,
                                                         "brand" : brand, "model": model }, {headers, observe: 'response'}).subscribe({
    next : data => {
      console.log('IN ADD DEVICE');
      console.log(data.body);
      // update the current user
      this.auth.setCurrentUser(data.body);
    },
    error: err => {
      console.log(`Error adding device to line ${phoneNumber} for user ${this.currentUser?.email}`);
      console.log(err);
    },
    complete: () => console.log(`device ${brand} ${model} for line ${phoneNumber} for user ${this.currentUser?.email}`)
  });
  if(this.updatedLine === undefined) {
    return;
  }
  return this.updatedLine!;
}

/**
 * Remove a device from a line
 * @returns an updated device that can replace the existing one in the current user's devices array
 */
removeDevice(phoneNumber: string, brand: string, model: string): Line | undefined{
  const headers = this.getHeader();
  this.http.post<any>(this.baseURL + '/device' + '/remove', { "phoneNumber" : phoneNumber,
  "brand" : brand, "model": model }, {headers, observe: 'response'}).subscribe({
    next : data => {
      console.log('IN REMOVE DEVICE');
      console.log(data.body);
      // update the current user
      this.auth.setCurrentUser(data.body);
    },
    error: err => {
      console.log(`Error removing device from line ${phoneNumber} for user ${this.currentUser?.email}`);
      console.log(err);
    },
    complete: () => console.log(`Device removed from line ${phoneNumber} for user ${this.currentUser?.email}`)
  });
  if(this.updatedLine === undefined) {
    return;
  }
  return this.updatedLine!;
}

//   ///////////////
//   /////LINES/////
//   ///////////////

/**
 * Add a line to one of the current user's plans
 * @param planType 
 * @param phoneNumber 
 * @returns an updated plan that can replace the existing one in the current user's plans array
 */
addLine(planType: string): Plan | undefined {
  const headers = this.getHeader();
  this.http.post<any>(this.baseURL + '/line' + '/add', { "planType" : planType }, {headers, observe: 'response'}).subscribe({
    next : data => {
      console.log('IN ADD LINE');
      console.log(data.body);
      // update the current user
      this.auth.setCurrentUser(data.body);
    },
    error: err => {
      console.log(`Error adding line to plan ${planType} for user ${this.currentUser?.email}`);
      console.log(err);
      return;
    },
    complete: () => {
      console.log(`Line added to plan ${planType} for user ${this.currentUser?.email}`)
    }
  });
  if (this.updatedPlan === undefined) {
    return;
  } else {
    return this.updatedPlan;
  }
}
/**
 * Remove a line from one of the current user's plans
 * returns an updated plan that can replace the existing one in the current user's plans array
 */
removeLine(planType: string, phoneNumber: number): Plan | undefined {
  const headers = this.getHeader();
  this.http.post<any>(this.baseURL + '/line' + '/remove', { "planType" : planType,
                                                         "phoneNumber" : phoneNumber }, {headers, observe: 'response'}).subscribe({
    next : data => {
      console.log('IN REMOVE LINE');
      console.log(data.body);
      // update the current user
      this.auth.setCurrentUser(data.body);
    },
    error: err => {
      console.log(`Error removing line ${phoneNumber} from plan ${planType} for user ${this.currentUser?.email}`);
      console.log(err);
    },
    complete: () => {
      console.log(`Line ${phoneNumber} from plan ${planType} for user ${this.currentUser?.email} removed`)

    }
  });
  // return the updated plan if successful, else return nothing.
  if (this.updatedPlan === undefined) {
    return;
  } else {
    return this.updatedPlan;
  }
}

//   ///////////////
//   /////PLANS/////
//   ///////////////

/**
 * Get all plans from the backend
 */
// getAllPlans() {
//   const headers = this.getHeader();
//   this.http.get<any>(this.baseURL + '/plan' + '/all', {observe: 'response'}).subscribe({
//     next : data => {
//       console.log("Requesting all plans");
//       console.log(data.body);
//       // store all plans in this component
//       this.allPlans = data.body;
//     },
//     error: err => {
//       console.log('Error retrieving plans');
//       console.log(err);
      
//     },
//     complete: () => {
//       console.log('All plans retrieved');
//     }
//   });
// }

/**
 * Add a plan to the current user
 * @param planType
 */
  addPlan(planType: string) {
    const headers = this.getHeader();
    this.http.post<any>(this.baseURL + '/plan' + '/add', { "planType" : planType }, {headers, observe: 'response'}).subscribe({
      next : data => {
        console.log('IN ADD PLAN');
        console.log(data.body);
        // update the current user
        this.auth.setCurrentUser(data.body);
      },
      error: err => {
        console.log(`Error adding plan ${planType} to user ${this.currentUser?.email}`);
        console.log(err);
      },
      complete: () => console.log(`Plan ${planType} added to user ${this.currentUser?.email}`)
    });
  }

  /**
   * Remove a plan from the current user
   * @param planType 
   */
  removePlan(planType: string) {
    const headers = this.getHeader();
    this.http.post<any>(this.baseURL + '/plan' + '/remove', { "planType" : planType }, {headers, observe: 'response'}).subscribe({
      next : data => {
        console.log('IN REMOVE PLAN');
        console.log(this.currentUser);
        // update the current user
      this.auth.setCurrentUser(data.body);
      },
      error: err => {
        console.log(`Error removing plan ${planType} from user ${this.currentUser?.email}`);
        console.log(err);
      },
      complete: () => console.log(`Plan ${planType} removed from user ${this.currentUser?.email}`)
    });
  }

}
