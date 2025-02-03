import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    
    { path: 'Login', component: LoginComponent },
    { path: 'Registration', component: RegistrationComponent },
];
