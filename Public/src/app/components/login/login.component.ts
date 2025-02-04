import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, InputTextModule, FormsModule, PasswordModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  emailValue: string | undefined;
  passValue!: string;

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  loginUser() {
    if (!this.emailValue || !this.passValue) {
      console.error("Minden mezőt ki kell tölteni!");
      return;
    }

    const userData = { email: this.emailValue, password: this.passValue };

    this.api.login(userData).subscribe({
      next: (res) => {
        console.log(" Sikeres bejelentkezés:", res);
        alert("Sikeres bejelentkezés!");

        this.authService.setToken(res.token);
        this.authService.setUserData(res.user.name, res.user.domain);

        setTimeout(() => {
          this.router.navigate(['/Dashboard']);
        }, 100); 
      },
      error: (err) => {
        console.error(" Hiba a bejelentkezésnél:", err);
        alert("Hiba a bejelentkezésnél!");
      }
    });
  }
}
