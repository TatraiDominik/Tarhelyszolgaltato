import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getToken() !== null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(this.getUserName());
  userName$ = this.userNameSubject.asObservable();

  private userDomainSubject = new BehaviorSubject<string | null>(this.getUserDomain());
  userDomain$ = this.userDomainSubject.asObservable();

  constructor() {}

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      this.isLoggedInSubject.next(true);
      this.triggerAuthUpdate(); 
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  setUserData(name: string, domain: string) {  // 🔥 ÚJ: Együtt menti a nevet és a domaint
    if (typeof window !== 'undefined') {
      localStorage.setItem('username', name);
      localStorage.setItem('userdomain', domain);
      this.userNameSubject.next(name);
      this.userDomainSubject.next(domain);
    }
  }

  getUserName(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username');
    }
    return null;
  }

  getUserDomain(): string | null { 
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userdomain');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  isAdmin(): boolean {
    return this.getUserName() === 'admin';
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userdomain');
      this.isLoggedInSubject.next(false);
      this.userNameSubject.next(null);
      this.triggerAuthUpdate(); 
    }
  }
  
  triggerAuthUpdate() {
    this.isLoggedInSubject.next(this.isLoggedIn());
    this.userNameSubject.next(this.getUserName());
  }
}
