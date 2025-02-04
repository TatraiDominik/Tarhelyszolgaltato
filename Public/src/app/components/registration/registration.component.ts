import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CardModule, InputTextModule, FormsModule, PasswordModule, ButtonModule ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  userValue: string | undefined;
  emailValue: string | undefined;
  passValue!: string;
  router: any;

  constructor(
    private api: ApiService
  ){}
  registerUser() {
    if (!this.userValue || !this.emailValue || !this.passValue) {
      console.error("Minden mezőt ki kell tölteni!");
      return;
    }
  
    const userData = {
      name: this.userValue,
      email: this.emailValue,
      password: this.passValue
    };
  
    this.api.register(userData).subscribe({
      next: (res) => {
        console.log("Sikeres regisztráció:", res);
        alert("Sikeres regisztráció:")

        this.router.navigate(['/Login']);
      },
      error: (err) => {
        console.error("Hiba a regisztrációnál:", err);
        alert("Hiba a regisztrációnál:")
      }
    });
  }
}
