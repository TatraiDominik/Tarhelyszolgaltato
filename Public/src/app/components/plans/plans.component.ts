import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-plans',
    standalone: true,
    imports: [CardModule, ButtonModule, CommonModule],
    templateUrl: './plans.component.html',
    styleUrl: './plans.component.scss'
})
export class PlansComponent implements OnInit {
    plans: any[] = []; // Az előfizetések listája

    constructor(private api: ApiService) {}

    ngOnInit(): void {
        this.loadPlans(); // Adatok betöltése a komponens inicializálásakor
    }

    loadPlans(): void {
        this.api.getPlans().subscribe({
            next: (data) => {
                console.log('API válasz:', data); // Ellenőrizd a válasz adatokat
                if (data.success) {
                    this.plans = data.results; // A válaszból a results tömb
                }
            },
            error: (err) => {
                console.error('Hiba történt az adatok betöltésekor:', err);
            }
        });
    }
}
