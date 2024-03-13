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

  // current user and logged in status from auth service
  currentUser: User | null = null;
  isLoggedIn: boolean = false;

    // subscribe to auth service's stored current user and logged in status
    ngOnInit(): void {
        this.auth.currentUser.subscribe(user => {
          if(user !== null) {
            this.currentUser = user;
          }
        });
        this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
        this.getAllDevices();
        this.getAllPlans();
      }

//   // postUser = new User('','','','');
//   // getUser = new User('','','','');
//   // putUser = new User('','','','');
//   // deletedUser = new User('','','','');
//   // allUsers: User[] = [];

//   // postDevice = undefined;
//   // getDevice = undefined;
//   // putDevice = undefined;
//   // deletedDevice = undefined;
  allDevices: Device[] = [];

  updatedLine: Line | undefined = undefined;
//   // postLine = new Line(0,0,'');
//   // getLine = new Line(0,0,'');
//   // putLine = new Line(0,0,'');
//   // deletedLine = new Line(0,0,'');
//   // allLines: Line[] = [];

  updatedPlan: Plan | undefined = undefined;
//   // getPlan = new Plan(0,"",0,0,'');
//   // putPlan = new Plan(0,"",0,0,'');
//   // deletedPlan = new Plan(0,"",0,0,'');
  allPlans: Plan[] = [];


  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getHeader() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${this.currentUser?.email}:${this.currentUser?.password}`)
    }
  }

//   ///////////////
//   /////USERS/////
//   ///////////////

//   /**
//    * POST /user
//    */
//   register(user: User) {
//     this.http.post<any>(this.baseURL + 'user', user, {observe: 'response'}).subscribe({
//       next : data => this.postUser = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('User registered')
//     });
//   }

//   /**
//    * 
//    */
//   login(userName: string, hashedPw: string) {
    
//   }

//   /**
//    * GET /user/{id}
//    */
//   getUserById(id: number) {
//     this.http.get<any>(this.baseURL + 'user/' + id, {observe: 'response'}).subscribe({
//       next : data => this.getUser = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('User retrieved by ID')
//     });
//   }

//   /**
//    * GET /user/{email}
//    */
//   getUserByEmail(email: string) {
//     this.http.get<any>(this.baseURL + 'user/' + email, {observe: 'response'}).subscribe({
//       next : data => this.getUser = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('User retrieved by email')
//     });
//   }

//   /**
//    * GET /user
//    */
//   getAllUsers() {
//     this.http.get<any>(this.baseURL + 'user', {observe: 'response'}).subscribe({
//       next : data => this.allUsers = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('All users retrieved')
//     });
//   }

  /**
   * PUT /user/{id}
   */
//   editUser(id: number, user: User) {
//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': 'Basic ' + btoa(`${this.auth.userName}:${this.auth.password}`)
//     }
//     this.http.put<any>(this.baseURL + 'user/' + id, user, {observe: 'response', headers}).subscribe({
//       next : data => this.putUser = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('User edited')
//     });
//   }

//   // DELETE /user/{id}
//   deleteUser(id: string) {
//     this.http.delete<any>(this.baseURL + 'user/' + id, {observe: 'response'}).subscribe({
//       next : data => this.deletedUser = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('User deleted')
//     });
//   }

  // addPlan(plan: Plan) {
  //   this.http.post<any>(this.baseURL + 'user', plan.planType, {observe: 'response'}).subscribe({
  //     next : data => {},
  //     error: err => console.log(err),
  //     complete: () => {
  //       console.log('User registered')
  //     }
  //   });
  // }

//   /////////////////
//   /////DEVICES/////
//   /////////////////

/**
 * Get all devices from the backend
 */
  getAllDevices() {
    const headers = this.getHeader();
    this.http.get<any>(this.baseURL + '/device' + '/all', {observe: 'response'}).subscribe({
      next : data => {
        console.log("Requesting all devices");
        console.log(data.body);
        this.allDevices = data.body;
      },
      error: err => {
        console.log('Error retrieving devices');
        console.log(err);
      },
      complete: () => {
        console.log('All devices retrieved');
      }
    });
  }

  /**
   * Add a device to the current user
   * @param phoneNumber 
   * @param brand 
   * @param model 
   * @returns an updated line that can replace the existing one in the current user's lines array
   */
  addDevice(phoneNumber: number, brand: string, model: string): Line | undefined{
  const headers = this.getHeader();
  this.http.post<any>(this.baseURL + '/device' + '/add', { "phoneNumber" : phoneNumber,
                                                         "brand" : brand, "model": model }, {headers, observe: 'response'}).subscribe({
    next : data => {
      console.log(data.body);
      this.updatedLine = data.body;
    },
    error: err => {
      console.log('Error adding device');
      console.log(err);
    },
    complete: () => console.log('device added')
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
removeDevice(): Line | undefined{
  const headers = this.getHeader();
  this.http.delete<any>(this.baseURL + '/device' + '/remove', {headers, observe: 'response'}).subscribe({
    next : data => {
      console.log(data.body);
      this.updatedLine = data.body;
    },
    error: err => {
      console.log('Error removing device');
      console.log(err);
    },
    complete: () => console.log('device removed')
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
addLine(planType: string, phoneNumber: number): Plan | undefined {
  const headers = this.getHeader();
  this.http.post<any>(this.baseURL + '/line' + '/add', { "planType" : planType,
                                                         "phoneNumber" : phoneNumber }, {headers, observe: 'response'}).subscribe({
    next : data => {
      console.log(data.body);
      this.updatedPlan = data.body;
    },
    error: err => {
      console.log('Error adding plan');
      console.log(err);
      return;
    },
    complete: () => console.log('Plan added')
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
// removeLine(planType: string, phoneNumber: number): Plan | undefined {
//   const headers = this.getHeader();
//   this.http.delete<any>(this.baseURL + '/line' + '/remove', { "planType" : planType,
//                                                          "phoneNumber" : phoneNumber }, { observe: 'response'}).subscribe({
//     next : data => {
//       console.log(data.body);
//       this.updatedPlan = data.body;
//     },
//     error: err => {
//       console.log('Error adding plan');
//       console.log(err);
//     },
//     complete: () => console.log('Plan added')
//   });
//   // return the updated plan if successful, else return nothing.
//   if (this.updatedPlan === undefined) {
//     return;
//   } else {
//     return this.updatedPlan;
//   }
// }

//   ///////////////
//   /////PLANS/////
//   ///////////////

/**
 * Get all plans from the backend
 */
getAllPlans() {
  const headers = this.getHeader();
  this.http.get<any>(this.baseURL + '/plan' + '/all', {observe: 'response'}).subscribe({
    next : data => {
      console.log("Requesting all plans");
      console.log(data.body);
      // store all plans in this component
      this.allPlans = data.body;
    },
    error: err => console.log(err),
    complete: () => {
      console.log('All plans retrieved');
    }
  });
}

/**
 * Add a plan to the current user
 * @param planType
 */
  addPlan(planType: string) {
    const headers = this.getHeader();
    this.http.post<any>(this.baseURL + '/plan' + '/add', { "planType" : planType }, {headers, observe: 'response'}).subscribe({
      next : data => {
        console.log(this.currentUser);
        // update the current user
        this.auth.setCurrentUser(data.body);
      },
      error: err => {
        console.log('Error adding plan');
        console.log(err);
      },
      complete: () => console.log('Plan added')
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
        console.log(this.currentUser);
        this.auth.setCurrentUser(data.body);
      },
      error: err => {
        console.log('Error removing plan');
        console.log(err);
      },
      complete: () => console.log('Plan removed')
    });
  }

}
