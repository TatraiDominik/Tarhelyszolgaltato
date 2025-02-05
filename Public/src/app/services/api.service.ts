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
  login(userData: { email: string; password: string }): Observable<any> {
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

}
