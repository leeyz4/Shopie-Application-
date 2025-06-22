import { CanActivate, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from "./guards/auth-guard";
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { AdminProductsComponent } from './pages/admin-products/admin-products';
import { AdminAddEditProductComponent } from './pages/admin-add-edit-product/admin-add-edit-product';
import { AdminUsersComponent } from './pages/admin-users/admin-users';
import { AdminEditUserComponent } from './pages/admin-edit-user/admin-edit-user';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard';
import { CustomerProductsComponent } from './pages/customer-products/customer-products';
import { CartComponent } from './pages/cart/cart';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { ResetPasswordComponent } from './pages/reset-password/reset-password';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'products', component: AdminProductsComponent },
      { path: 'products/add/edit', component: AdminAddEditProductComponent },
      { path: 'products/add/edit/:id', component: AdminAddEditProductComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'users/edit/:id', component: AdminEditUserComponent },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'customer',
    component: CustomerDashboardComponent,
    children: [
      { path: 'products', component: CustomerProductsComponent },
      { path: 'cart', component: CartComponent },
    ],
    canActivate: [AuthGuard]
  }
];