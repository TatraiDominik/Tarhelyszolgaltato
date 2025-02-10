import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Public';
  items: MenuItem[] = [];
  private authSubscription!: Subscription;
  private userSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(() => {
      this.updateMenu();
    });

    this.userSubscription = this.authService.userName$.subscribe(() => {
      this.updateMenu();
    });

    this.updateMenu();
  }

  updateMenu() {
    const isLoggedIn = this.authService.isLoggedIn();
    const isAdmin = this.authService.isAdmin();

    this.items = [
      
      !isLoggedIn ? { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/Login' } : null,
      !isLoggedIn ? { label: 'Registration', icon: 'pi pi-user-plus', routerLink: '/Registration' } : null,
      isLoggedIn ? { label: 'Dashboard', icon: 'pi pi-objects-column', routerLink: '/Dashboard' } : null,
      isLoggedIn ? { label: 'Plans', icon: 'pi pi-ticket', routerLink: '/Plans' } : null,
      isLoggedIn ? { label: 'Profile', icon: 'pi pi-user', routerLink: '/Profile' } : null,
      isAdmin ? { label: 'Admin Plans', icon: 'pi pi-pen-to-square', routerLink: '/PlansAdmin' } : null,
      isAdmin ? { label: 'Users', icon: 'pi pi-users', routerLink: '/Users' } : null,
      isLoggedIn ? { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() } : null
    ].filter(item => item !== null) as MenuItem[];
    
    
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/Login']);
    this.updateMenu();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
