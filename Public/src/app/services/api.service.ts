import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  server = `http://localhost:3000/api`;

  // Regisztráció
  register(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.server}/user/register`, userData);
  }

  // Bejelentkezés
  login(userData: {email: string; password: string }): Observable<any> {
    return this.http.post(`${this.server}/user/login`, userData);
  }

  // Token hozzáadása a kérésekhez
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Felhasználók lekérése (védett route)
  getUsers(): Observable<any> {
    return this.http.get(`${this.server}/user`, { headers: this.getHeaders() });
  }

  // Profil lekérése (védett route)
  getProfile(): Observable<any> {
    return this.http.get(`${this.server}/user/profile`, { headers: this.getHeaders() });
  }

  getPlans(): Observable<any> {
    return this.http.get(`${this.server}/plans/getPlans`, { headers: this.getHeaders() });
  }

  addPlan(planData: { name: string, price: number, description: string }): Observable<any> {
    return this.http.post(`${this.server}/plans/addPlan`, planData, { headers: this.getHeaders() });
  }

   
  updatePlan(planId: string, planData: { name: string, price: number, description: string }): Observable<any> {
    return this.http.patch(`${this.server}/plans/${planId}`, planData, { headers: this.getHeaders() });
  }
  
    
  deletePlan(planId: string): Observable<any> {
    return this.http.delete(`${this.server}/plans/${planId}`, { headers: this.getHeaders() });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.server}/user/${userId}`, { headers: this.getHeaders() });
  }

  updateUser(userId: string, userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.patch(`${this.server}/user/${userId}`, userData, { headers: this.getHeaders() });
  }

  
  getUserPlans(userId: string): Observable<any> {
      return this.http.get(`${this.server}/user/plans`, { headers: this.getHeaders() });
  }
  
  
  addPlanToUser(userId: string, planId: string): Observable<any> {
    const planData = { userId, planId };
    return this.http.post(`${this.server}/user/add-plan`, planData, { headers: this.getHeaders() });
  }

  createDatabase(data: { dbname: string }): Observable<any> {
    return this.http.post(`${this.server}/database/create-database`, data, { headers: this.getHeaders() });
  }

  createUser(data: { username: string }): Observable<any> {
      return this.http.post(`${this.server}/database/create-user`, data, { headers: this.getHeaders() });
  }

  grantPrivileges(data: { username: string, dbname: string, privileges: string }): Observable<any> {
      return this.http.post(`${this.server}/database/grant-privileges`, data, { headers: this.getHeaders() });
  }
}
