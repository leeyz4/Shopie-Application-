import { Routes, RouterModule } from '@angular/router';
import { Login } from '../app/components/login/login';
import { Registration } from '../app/components/registration/registration';
import { ForgotPassword } from '../app/components/forgot-password/forgot-password';
import { ResetPassword } from '../app/components/reset-password/reset-password';
import { Home } from '../app/components/home/home';
import { Header } from '../app/shared/header/header';
import { ProductCard } from '../app/shared/product-card/product-card';
import { Profile } from '../app/components/profile/profile';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'registration', component: Registration },
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'reset-password', component: ResetPassword },
    { path: 'home', component: Home },
    { path: 'header', component: Header },
    { path: 'product-card', component: ProductCard },
    { path: 'profile', component: Profile},
];
