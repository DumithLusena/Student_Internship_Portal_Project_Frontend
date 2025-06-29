import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { UserRole } from './model/user';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.ADMIN] },
  },
  {
    path: 'company',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.COMPANY] },
  },
  {
    path: 'student',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.STUDENT] },
  },
];
