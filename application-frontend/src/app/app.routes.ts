import { Routes } from '@angular/router';
import { DevicesPageComponent } from './devices-page/devices-page.component';
import { PlansPageComponent } from './plans-page/plans-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'devices',
        component: DevicesPageComponent
    },
    {
        path: 'plans',
        component: PlansPageComponent
    },
    {
        path: 'account',
        component: AccountPageComponent
    }
];
