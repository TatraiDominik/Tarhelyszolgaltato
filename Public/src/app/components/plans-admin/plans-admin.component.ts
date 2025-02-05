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
  styleUrls: ['./plans-admin.component.scss']
})
export class PlansAdminComponent {
  planName: string | undefined;
  planPrice: string | undefined;
  planDesc: string | undefined;
  planId: string | undefined;  

  plans: any[] = []; 

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

  addNewPlan(): void {
    const newPlan = {
      name: this.planName!,
      price: parseFloat(this.planPrice!),
      description: this.planDesc!
    };

    this.api.addPlan(newPlan).subscribe({
      next: (data) => {
        console.log('Új előfizetés hozzáadva:', data);
        this.plans.push(data); 
      },
      error: (err) => {
        console.error('Hiba történt az új előfizetés hozzáadása közben:', err);
      }
    });
  }

  updatePlan(): void {
    if (this.planId && this.planName && this.planPrice && this.planDesc) {
      const updatedPlan = {
        name: this.planName!,
        price: parseFloat(this.planPrice!),
        description: this.planDesc!
      };

      this.api.updatePlan(this.planId, updatedPlan).subscribe({
        next: (data) => {
          console.log('Terv frissítve:', data);
          const index = this.plans.findIndex(plan => plan.id === this.planId);
          if (index !== -1) {
            this.plans[index] = data;
          }
          window.location.reload();
        },
        error: (err) => {
          console.error('Hiba történt a terv frissítésekor:', err);
        }
      });
    } else {
      console.log('Minden mezőt ki kell tölteni a szerkesztéshez.');
    }
  }

  deletePlan(planId: string | undefined): void {
    if (!planId) {
      console.log('Nincs kiválasztott terv a törléshez.');
      return;
    }
  
    console.log('A törlendő planId:', planId);  // Ellenőrizd, hogy helyesen van-e a planId
  
    // Ellenőrizd, hogy a kérés valóban a megfelelő URL-t tartalmazza
    this.api.deletePlan(planId).subscribe({
      next: (data) => {
        console.log('Terv törölve:', data);
        this.plans = this.plans.filter(plan => plan.id !== planId);
      },
      error: (err) => {
        console.error('Hiba történt a terv törlésekor:', err);
        // Ha a 400-as hiba miatt történik, talán van egy hibaüzenet az err-ben
        console.log('Hiba részletei:', err.error);  // A hiba részletei a response-ban
      }
    });
  }

  editPlan(plan: any): void {
    this.planId = plan.id;
    this.planName = plan.name;
    this.planPrice = plan.price;
    this.planDesc = plan.description;
  }

  shortDescription(description: string): string {
    return description.length > 100 ? description.slice(0, 30) + '...' : description;
  }
}
