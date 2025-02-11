import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,  // Ezt add hozzá
  imports: [CommonModule], // Itt van a probléma megoldása!
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  userName: string | null = null;
  userPlans: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userName = this.authService.getUserName();

    if (this.userId) {
      this.loadUserPlans();
    }
  }

  loadUserPlans(): void {
    if (!this.userId) return;

    this.apiService.getUserPlans(this.userId).subscribe({
      next: (plans) => {
        console.log('Felhasználó előfizetései:', plans);
        this.userPlans = plans;
      },
      error: (err) => {
        console.error('Hiba az előfizetések betöltésekor:', err);
      }
    });
  }
}
