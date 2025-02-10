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
            this.router.navigate(['/login']);  // Átirányítás a bejelentkezési oldalra
            return;
        }
    
        if (!this.selectedPlanId) {
            alert('Kérlek, válassz tervet!');
            return;
        }
    
        this.api.addPlanToUser(userId, this.selectedPlanId).subscribe({
            next: (response) => {
                alert('Előfizetés sikeresen hozzáadva!');
                // További műveletek, például átirányítás vagy frissítés
            },
            error: (err) => {
                console.error('Hiba történt az előfizetés hozzáadásakor:', err);
                alert('Hiba történt az előfizetés hozzáadásakor.');
            }
        });
    }
}