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
  private allDevicesSubject = new BehaviorSubject<Device[]>([]);
  allDevices = this.allDevicesSubject.asObservable();

//   // postLine = new Line(0,0,'');
//   // getLine = new Line(0,0,'');
//   // putLine = new Line(0,0,'');
//   // deletedLine = new Line(0,0,'');
//   // allLines: Line[] = [];

//   // postPlan = new Plan(0,"",0,0,'');
//   // getPlan = new Plan(0,"",0,0,'');
//   // putPlan = new Plan(0,"",0,0,'');
//   // deletedPlan = new Plan(0,"",0,0,'');
  private allPlansSubject = new BehaviorSubject<Plan[]>([]);
  allPlans = this.allPlansSubject.asObservable();


  constructor(private http: HttpClient, private auth: AuthService) { }

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

//   /**
//    * GET /device
//    */
  getAllDevices() {
    const headers = this.getHeader();
    this.http.get<any>(this.baseURL + 'device/' + 'all', {headers, observe: 'response'}).subscribe({
      next : data => {
        console.log("Requesting all devices");
        console.log(data.body);
        this.allDevicesSubject = data.body;
      },
      error: err => console.log(err),
      complete: () => {
        console.log('All devices retrieved');
      }
    });
  }

//   /**
//    * GET /device/{id}
//    */
//   getDeviceById(id: string) {
//     this.http.get<any>(this.baseURL + 'device/' + id, {observe: 'response'}).subscribe({
//       next : data => this.getDevice = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Device retrieved by ID')
//     });
//   }

//   /**
//    * POST /device
//    */
//   createDevice(device: Device) {
//     this.http.post<any>(this.baseURL + 'device', {observe: 'response'}).subscribe({
//       next : data => this.postDevice = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Device created')
//     });
//   }

//   /**
//    * PUT /device/{id}
//    */
//   updateDevice(id: string) {
//     this.http.put<any>(this.baseURL + 'device/' + id, {observe: 'response'}).subscribe({
//       next : data => this.putDevice = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Device updated')
//     });
//   }

//   /**
//    * DELETE /device/{id}
//    */
//   deleteDevice(id: string) {
//     this.http.delete<any>(this.baseURL + 'device/' + id, {observe: 'response'}).subscribe({
//       next : data => this.deletedDevice = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Device deleted')
//     });
//   }

//   ///////////////
//   /////LINES/////
//   ///////////////

//   /**
//    * GET /line
//    */
//   getAllLines() {
//     this.http.get<any>(this.baseURL + 'line', {observe: 'response'}).subscribe({
//       next : data => this.allLines = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('All lines retrieved')
//     });
//   }

//   /**
//    * GET /line/{id}
//    */
//   getLineById(id: string) {
//     this.http.get<any>(this.baseURL + 'line/' + id, {observe: 'response'}).subscribe({
//       next : data => this.getLine = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Line retrieved by ID')
//     });
//   }

//   /**
//    * GET /line/{number}
//    */
//   getLineByNumber(num: number) {
//     this.http.get<any>(this.baseURL + 'line/' + num, {observe: 'response'}).subscribe({
//       next : data => this.getLine = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Line retrieved by phone number')
//     });
//   }

//   /**
//    * POST /line
//    */
//   createLine() {
//     this.http.post<any>(this.baseURL + 'line', {observe: 'response'}).subscribe({
//       next : data => this.postLine = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Line created')
//     });
//   }

//   /**
//    * PUT /line/{id}
//    */
//   updateLine(id: string) {
//     this.http.put<any>(this.baseURL + 'line/' + id, {observe: 'response'}).subscribe({
//       next : data => this.putLine = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Line updated')
//     });
//   }

//   /**
//    * DELETE /line/{id}
//    */
//   deleteLine(id: string) {
//     this.http.delete<any>(this.baseURL + 'line/' + id, {observe: 'response'}).subscribe({
//       next : data => this.deletedLine = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Line deleted')
//     });
//   }

//   ///////////////
//   /////PLANS/////
//   ///////////////

//   /**
//    * GET /plan
//    */
getAllPlans() {
  const headers = this.getHeader();
  this.http.get<any>(this.baseURL + 'plan/' + 'all', {headers, observe: 'response'}).subscribe({
    next : data => {
      console.log("Requesting all plans");
      console.log(data.body);
      this.allPlansSubject = data.body;
    },
    error: err => console.log(err),
    complete: () => {
      console.log('All plans retrieved');
    }
  });
}

//   /**
//    * GET /plan/{id}
//    */
//   getPlanById(id: string) {
//     this.http.get<any>(this.baseURL + 'plan/' + id, {observe: 'response'}).subscribe({
//       next : data => this.getPlan = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Plan retrieved by ID')
//     });
//   }

//   /**
//    * POST /plan
//    */
//   createPlan() {
//     this.http.post<any>(this.baseURL + 'plan', {observe: 'response'}).subscribe({
//       next : data => this.postPlan = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Plan created')
//     });
//   }

//   /**
//    * PUT /plan/{id}
//    */
//   updatePlan(id: string) {
//     this.http.put<any>(this.baseURL + 'plan/' + id, {observe: 'response'}).subscribe({
//       next : data => this.putPlan = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Plan updated')
//     });
//   }

//   /**
//    * DELETE /plan/{id}
//    */
//   deletePlan(id: string) {
//     this.http.delete<any>(this.baseURL + 'plan/' + id, {observe: 'response'}).subscribe({
//       next : data => this.deletedPlan = data.body.data,
//       error: err => console.log(err),
//       complete: () => console.log('Plan deleted')
//     });
//   }

}
