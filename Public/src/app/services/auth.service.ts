import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Ezt hozzáadjuk
import { Observable } from 'rxjs'; // Ezt is hozzáadjuk
import { tap } from 'rxjs/operators'; // A 'tap' operátor importálása

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private server = 'http://localhost:3000/api'; // API alap URL, amihez hozzáférsz a login kérésekhez

  // Az HttpClient példány hozzáadása a konstruktorhoz
  constructor(private http: HttpClient) {}

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getToken() !== null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(this.getUserName());
  userName$ = this.userNameSubject.asObservable();

  private userDomainSubject = new BehaviorSubject<string | null>(this.getUserDomain());
  userDomain$ = this.userDomainSubject.asObservable();

  // Token mentése a localStorage-ba
  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      this.isLoggedInSubject.next(true);
      this.triggerAuthUpdate(); 
    }
  }

  // Token lekérése
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Felhasználói adatok mentése (név és domain)
  setUserData(name: string, domain: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('username', name);
      localStorage.setItem('userdomain', domain);
      this.userNameSubject.next(name);
      this.userDomainSubject.next(domain);
    }
  }

  // Felhasználó neve lekérése
  getUserName(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username');
    }
    return null;
  }

  // Felhasználó domainje lekérése
  getUserDomain(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userdomain');
    }
    return null;
  }

  // Ellenőrzi, hogy be van-e jelentkezve
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Admin státusz ellenőrzése
  isAdmin(): boolean {
    return this.getUserName() === 'admin';
  }

  // Kilépés (logout)
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

  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.server}/user/login`, userData).pipe(
        tap((response: any) => {
            // Token mentése
            this.setToken(response.token);

            // Token dekódolása
            const decodedToken = this.decodeToken(response.token);
            const userId = decodedToken.id;  // Felhasználó ID kinyerése
            const userName = decodedToken.name;  // Felhasználó neve
            const userDomain = decodedToken.domain;  // Domain

            // Felhasználói adatok mentése
            this.setUserData(userName, userDomain);

            // Felhasználó ID mentése a localStorage-ba
            if (typeof window !== 'undefined') {
                localStorage.setItem('userId', userId);  // userId mentése
            }
        })
    );
}

  // Felhasználói ID lekérése a dekódolt tokenből
  getUserId(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('userId');  // userId lekérése
    }
    return null;
}

  // JWT token dekódolása
  private decodeToken(token: string): any {
    try {
        const payload = token.split('.')[1];  // Token második része (payload)
        const decoded = atob(payload);  // Base64 dekódolás
        return JSON.parse(decoded);  // JSON objektummá alakítás
    } catch (error) {
        console.error('Hiba a token dekódolásakor:', error);
        return null;
    }
}

  // Auth státusz frissítése
  triggerAuthUpdate() {
    this.isLoggedInSubject.next(this.isLoggedIn());
    this.userNameSubject.next(this.getUserName());
  }
}
