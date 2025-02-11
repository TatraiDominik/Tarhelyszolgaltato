import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service'; 
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';

interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    // További mezők, ha szükséges
}

@Component({
    selector: 'app-plans',
    standalone: true,
    imports: [CardModule, ButtonModule, CommonModule, RouterModule, RouterOutlet],
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
    plans: Plan[] = []; // Az előfizetések listája
    selectedPlanId: string = '';  // A kiválasztott terv ID-ja

    constructor(
        private api: ApiService, 
        private authService: AuthService,
        private router: Router  // Router injektálása
    ) {}

    ngOnInit(): void {
        this.loadPlans(); 
    }

    loadPlans(): void {
        this.api.getPlans().subscribe({
            next: (data) => {
                console.log('API válasz:', data); 
                if (data.success) {
                    this.plans = data.results; 
                }
            },
            error: (err) => {
                console.error('Hiba történt az adatok betöltésekor:', err);
            }
        });
    }

    addPlan(): void {
        const userId = this.authService.getUserId();
        console.log("userId: ", userId);
        if (!userId) {
            alert('Nincs bejelentkezett felhasználó. Kérlek, jelentkezz be!');
            this.router.navigate(['/login']);
            return;
        }
    
        if (!this.selectedPlanId) {
            alert('Kérlek, válassz tervet!');
            return;
        }
    
        // Első lépésként hozzáadjuk az előfizetést a felhasználóhoz
        this.api.addPlanToUser(userId, this.selectedPlanId).subscribe({
            next: (response) => {
                console.log('Előfizetés sikeresen hozzáadva!', response);
                alert('Előfizetés sikeresen hozzáadva!');
    
                // Kinyerjük a domain nevet a localStorage-ból
                const domainName = localStorage.getItem('userdomain');  // Ezt a domain nevet használjuk az adatbázis névhez
    
                if (!domainName) {
                    alert('Nem található domain név!');
                    return;
                }
    
                // Most a domain név alapján hozunk létre egy adatbázist
                this.createDatabaseForUser(domainName);
            },
            error: (err) => {
                console.error('Hiba történt az előfizetés hozzáadásakor:', err);
                alert('Hiba történt az előfizetés hozzáadásakor.');
            }
        });
    }
    
    createDatabaseForUser(domainName: string): void {
        // API hívás az adatbázis létrehozásához, most domain nevet használunk
        this.api.createDatabase({ dbname: domainName }).subscribe({
            next: (response) => {
                console.log('Database created:', response);
                this.createUserForDatabase(domainName);
            },
            error: (err) => {
                console.error('Hiba történt az adatbázis létrehozásakor:', err);
                alert('Hiba történt az adatbázis létrehozásakor.');
            }
        });
    }
    
    createUserForDatabase(domainName: string): void {
        // API hívás a felhasználó létrehozásához az adatbázishoz, most a domain nevet használjuk
        const username = `user_${domainName}`;
        this.api.createUser({ username }).subscribe({
            next: (response) => {
                console.log('User created for database:', response);
                this.grantPrivilegesToUser(username, domainName);
            },
            error: (err) => {
                console.error('Hiba történt a felhasználó létrehozásakor:', err);
                alert('Hiba történt a felhasználó létrehozásakor.');
            }
        });
    }
    
    grantPrivilegesToUser(username: string, domainName: string): void {
        // API hívás a jogosultságok hozzárendeléséhez a felhasználóhoz és adatbázishoz
        const privileges = 'SELECT, INSERT, UPDATE, DELETE';
        this.api.grantPrivileges({ username, dbname: domainName, privileges }).subscribe({
            next: (response) => {
                console.log('Privileges granted:', response);
                alert('Jogosultságok sikeresen hozzárendelve!');
            },
            error: (err) => {
                console.error('Hiba történt a jogosultságok hozzárendelésekor:', err);
                alert('Hiba történt a jogosultságok hozzárendelésekor.');
            }
        });
    }
    
    
}