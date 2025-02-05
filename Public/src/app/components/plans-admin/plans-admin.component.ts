import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-plans-admin',
  standalone: true,
  imports: [CardModule,InputTextModule, ButtonModule, CommonModule, FormsModule,InputTextareaModule],
  templateUrl: './plans-admin.component.html',
  styleUrl: './plans-admin.component.scss'
})
export class PlansAdminComponent {
  planName: string|undefined;
  planPrice: string|undefined;
  planDesc: string|undefined;
}
