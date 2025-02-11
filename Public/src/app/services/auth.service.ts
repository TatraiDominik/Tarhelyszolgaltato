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

  private userIdSubject = new BehaviorSubject<string|null>(this.getUserId());
  userId$ = this.userIdSubject.asObservable();

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
  setUserData(userId: string, name: string, domain: string) {
    if (typeof window !== 'undefined') {
      console.log("Felhasználói adatok mentése:", { userId, name, domain });
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', name);
      localStorage.setItem('userdomain', domain);
      this.userIdSubject.next(userId);
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
      localStorage.removeItem('userId');
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
  
        // API válaszból való adatok kinyerése
        const userId = response.user?.userID;  // Így helyesen hivatkozunk a user ID-ra
        const userName = response.user?.name;
        const userDomain = response.user?.domain;
  
        console.log("Kapott felhasználói adatok:", { userId, userName, userDomain });
  
        // Ha az adatok elérhetők, elmentjük őket
        if (userId && userName && userDomain) {
          this.setUserData(userId, userName, userDomain);
        }
      })
    );
  }

  // Felhasználói ID lekérése a dekódolt tokenből
  getUserId(): string | null {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      console.log("Lekért userId a localStorage-ból:", userId);
      return userId;
    }
    return null;
  }

  // JWT token dekódolása
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload); // Base64 dekódolás
      console.log("Dekódolt token:", decoded);  // Debugging
      return JSON.parse(decoded); // JSON objektummá alakítás
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
