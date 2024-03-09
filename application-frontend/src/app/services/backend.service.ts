import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseURL = environment.apiURL;
  postUser = new User(0,'','','','');
  getUser = new User(0,'','','','');
  updatedUser = new User(0,'','','','');
  deletedUser = new User(0,'','','','');

  constructor(private http: HttpClient) { }

  ///////////////
  /////USERS/////
  ///////////////

  /**
   * POST /user
   */
  register(user: User) {
    this.http.post<any>(this.baseURL + 'user', user, {observe: 'response'}).subscribe({
      next : data => this.postUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('User registered')
    });
  }

  /**
   * 
   */
  login(userName: string, hashedPw: string) {
    
  }

  /**
   * GET /user/{id}
   */
  getUserById(id: number) {
    this.http.get<any>(this.baseURL + 'user/' + id, {observe: 'response'}).subscribe({
      next : data => this.getUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('User retrieved by ID')
    });
  }

  /**
   * GET /user/{email}
   */
  getUserByEmail(email: string) {
    this.http.get<any>(this.baseURL + 'user/' + email, {observe: 'response'}).subscribe({
      next : data => this.getUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('User retrieved by email')
    });
  }

  /**
   * GET /user
   */
  getAllUsers() {
    this.http.get<any>(this.baseURL + 'user', {observe: 'response'}).subscribe({
      next : data => this.getUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('All users retrieved')
    });
  }

  /**
   * PUT /user/{id}
   */
  editUser(id: string, user: {}) {
    this.http.put<any>(this.baseURL + 'user/' + id, user, {observe: 'response'}).subscribe({
      next : data => this.getUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('User edited')
    });
  }

  // DELETE /user/{id}
  deleteUser(id: string) {
    this.http.delete<any>(this.baseURL + 'user/' + id, {observe: 'response'}).subscribe({
      next : data => this.deletedUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('User deleted')
    });
  }

  /////////////////
  /////DEVICES/////
  /////////////////

  /**
   * GET /device
   */
  getAllDevices() {
    this.http.get<any>(this.baseURL + 'device', {observe: 'response'}).subscribe({
      next : data => this.getUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('All devices retrieved')
    });
  }

  /**
   * GET /device/{id}
   */
  getDeviceById(id: string) {
    this.http.get<any>(this.baseURL + 'device/' + id, {observe: 'response'}).subscribe({
      next : data => this.getUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('Device retrieved by ID')
    });
  }

  /**
   * POST /device
   */
  createDevice(device: Device) {
    this.http.post<any>(this.baseURL + 'device', {observe: 'response'}).subscribe({
      next : data => this.getUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('Device created')
    });
  }

  /**
   * PUT /device/{id}
   */
  updateDevice(id: string) {
    this.http.put<any>(this.baseURL + 'device/' + id, {observe: 'response'}).subscribe({
      next : data => this.getUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('All devices retrieved')
    });
  }

  /**
   * DELETE /device/{id}
   */
  deleteDevice(id: string) {
    this.http.delete<any>(this.baseURL + 'device/' + id, {observe: 'response'}).subscribe({
      next : data => this.getUser = data.body.data,
      error: err => console.log(err),
      complete: () => console.log('All devices retrieved')
    });
  }

  ///////////////
  /////LINES/////
  ///////////////

  /**
   * GET /line
   */
  getAllLines() {

  }

  /**
   * GET /line/{id}
   */
  getLineById() {

  }

  /**
   * GET /line/{number}
   */
  getLineByNumber() {

  }

  /**
   * POST /line
   */
  createLine() {

  }

  /**
   * PUT /line/{id}
   */
  updateLine() {

  }

  /**
   * DELETE /line/{id}
   */
  deleteLine() {

  }

  ///////////////
  /////PLANS/////
  ///////////////

  /**
   * GET /plan
   */
  getAllPlans() {

  }

  /**
   * GET /plan/{id}
   */
  getPlanById() {

  }

  /**
   * POST /plan
   */
  createPlan() {

  }

  /**
   * PUT /plan/{id}
   */
  updatePlan() {

  }

  /**
   * DELETE /plan/{id}
   */
  deletePlan() {

  }

}
