import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit {
    userName: string = 'Teszt Elek'; // Példa felhasználónév
    userDomain: string = 'www.kulimakekszeresz.hu'; // Példa domain
    currentSubscription: string = 'Alap csomag'; // Példa előfizetés

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        // Példa: Adatok lekérése a backendről
        this.fetchUserData();
    }

    fetchUserData() {
        // Példa: HTTP kérés a backendhez
        this.http.get('http://localhost:3000/api/user').subscribe((response: any) => {
            this.userName = response.name;
            this.userDomain = response.domain;
            this.currentSubscription = response.subscription;
        });
    }
}