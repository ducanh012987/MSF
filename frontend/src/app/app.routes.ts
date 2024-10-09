import { Routes } from '@angular/router';
import { HomeComponent } from './components/layout/client/home/home.component';
import { LoginComponent } from './components/access/login/login.component';
import { SignupComponent } from './components/access/signup/signup.component';
import { authGuard } from './guards/auth/auth.guard';
import { HomeAdminComponent } from './components/layout/admin/home-admin/home-admin.component';
import { adminGuard } from './guards/admin/admin.guard';
import { UserManagerComponent } from './components/admin/user/user-manager/user-manager.component';
import { UserCreateComponent } from './components/admin/user/user-create/user-create.component';
import { UserUpdateComponent } from './components/admin/user/user-update/user-update.component';
import { RoleManagerComponent } from './components/admin/role/role-manager/role-manager.component';
import { RoleCreateComponent } from './components/admin/role/role-create/role-create.component';
import { RoleUpdateComponent } from './components/admin/role/role-update/role-update.component';
import { LogDetailComponent } from './components/admin/log/log-detail/log-detail.component';
import { LogManagerComponent } from './components/admin/log/log-manager/log-manager.component';

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
        path: 'user-manager/create',
        component: UserCreateComponent,
      },
      {
        path: 'user-manager/update/:id',
        component: UserUpdateComponent,
      },
      {
        path: 'role-manager',
        component: RoleManagerComponent,
      },
      {
        path: 'role-manager/create',
        component: RoleCreateComponent,
      },
      {
        path: 'role-manager/update/:id',
        component: RoleUpdateComponent,
      },
      {
        path: 'log-manager',
        component: LogManagerComponent,
      },
      {
        path: 'log-manager/log-detail/:id',
        component: LogDetailComponent,
      },
    ],
  },
];
