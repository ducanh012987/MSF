import { Routes } from '@angular/router';
import { HomeComponent } from './components/layout/client/home/home.component';
import { LoginComponent } from './components/access/login/login.component';
import { SignupComponent } from './components/access/signup/signup.component';
import { authGuard } from './guards/auth/auth.guard';
import { HomeAdminComponent } from './components/layout/admin/home-admin/home-admin.component';
import { adminGuard } from './guards/admin/admin.guard';
import { UserManagerComponent } from './components/admin/user/user-manager/user-manager.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'admin',
    component: HomeAdminComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'user-manager',
        component: UserManagerComponent,
      },
      {
        path: 'role',
        component: UserManagerComponent,
      },
    ],
  },
];
