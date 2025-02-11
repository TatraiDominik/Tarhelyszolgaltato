import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'] // FIGYELEM: styleUrls van, nem styleUrl!
})
export class UsersComponent implements OnInit {
  users: any[] = []; // A felhasználók listája

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadUsers(); // Adatok betöltése az inicializáláskor
  }

  loadUsers(): void {
    console.log('Felhasználók betöltése...');
    this.api.getUsers().subscribe({
      next: (data) => {
        console.log('API válasz:', data);
        // Ha az adatok közvetlenül jönnek, akkor nem kell a success ellenőrzése
        this.users = data;  // Az adatokat közvetlenül hozzárendeljük
        console.log('Felhasználók:', this.users);
      },
      error: (err) => {
        console.error('Hiba történt az adatok betöltésekor:', err);
      }
    });
  }
  
  // deleteUser metódus hozzáadása
  deleteUser(userId: string): void {
    this.api.deleteUser(userId).subscribe({
      next: (data) => {
        console.log('Felhasználó törölve:', data);
        // Frissítjük a felhasználók listáját, eltávolítjuk a törölt felhasználót
        this.users = this.users.filter(user => user.id !== userId);
      },
      error: (err) => {
        console.error('Hiba történt a felhasználó törlésekor:', err);
      }
    });
  }
}
