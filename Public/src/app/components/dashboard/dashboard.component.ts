import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule,ButtonModule,RouterModule], 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userName: string | null = '';
  userDomain: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userName$.subscribe(name => {
      this.userName = name;
    });

    this.authService.userDomain$.subscribe(domain => {
      this.userDomain = domain;
    });
  }
}
