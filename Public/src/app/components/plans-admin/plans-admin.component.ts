import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-plans-admin',
  standalone: true,
  imports: [CardModule, InputTextModule, ButtonModule, CommonModule, FormsModule, InputTextareaModule],
  templateUrl: './plans-admin.component.html',
  styleUrl: './plans-admin.component.scss'
})
export class PlansAdminComponent {
  planName: string | undefined;
  planPrice: string | undefined;
  planDesc: string | undefined;

  plans: any[] = []; // Az előfizetések listája

  constructor(private api: ApiService) {}

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

  // Új előfizetés hozzáadása
  addNewPlan(): void {
    const newPlan = {
      name: this.planName!,
      price: parseFloat(this.planPrice!),
      description: this.planDesc!
    };

    this.api.addPlan(newPlan).subscribe({
      next: (data) => {
        console.log('Új előfizetés hozzáadva:', data);
        // Itt hozzáadhatjuk a plans listához a friss adatot
        this.plans.push(data); // Frissítés az új előfizetéssel
        // Üzenet vagy egyéb frissítés a felhasználó számára
      },
      error: (err) => {
        console.error('Hiba történt az új előfizetés hozzáadása közben:', err);
      }
    });
  }

  // Kattintásra kitölti az űrlap mezőket
  editPlan(plan: any): void {
    this.planName = plan.name;
    this.planPrice = plan.price;
    this.planDesc = plan.description;
  }

  // Rövid description megjelenítése
  shortDescription(description: string): string {
    return description.length > 100 ? description.slice(0, 30) + '...' : description;
  }
}
