import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Public';

  items: MenuItem[] | undefined;



  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/Login'
        
      },
      {
        label: 'Registration',
        icon: 'pi pi-user-plus',
        routerLink: '/Registration'
      }
    ]
  }
}
