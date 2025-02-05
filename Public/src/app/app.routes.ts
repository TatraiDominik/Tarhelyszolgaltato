import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlansComponent } from './components/plans/plans.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { PlansAdminComponent } from './components/plans-admin/plans-admin.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    
    { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'Plans', component: PlansComponent, canActivate: [AuthGuard] },
    { path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'Users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'PlansAdmin', component: PlansAdminComponent, canActivate: [AuthGuard] },
    { path: 'Login', component: LoginComponent },
    { path: 'Registration', component: RegistrationComponent}
];
