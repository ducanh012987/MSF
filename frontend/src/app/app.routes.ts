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
import { MenuUpdateComponent } from './components/admin/menu/menu-update/menu-update.component';
import { MenuCreateComponent } from './components/admin/menu/menu-create/menu-create.component';
import { MenuManagerComponent } from './components/admin/menu/menu-manager/menu-manager.component';
import { PermissionManagerComponent } from './components/admin/permission/permission-manager/permission-manager.component';
import { PermissionCreateComponent } from './components/admin/permission/permission-create/permission-create.component';
import { PermissionUpdateComponent } from './components/admin/permission/permission-update/permission-update.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboarbComponent } from './components/admin/dashboarb/dashboarb.component';
import { ContractManagerComponent } from './components/admin/contract/contract-manager/contract-manager.component';

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
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboarbComponent,
      },
      {
        path: 'contract',
        component: ContractManagerComponent,
      },
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
        path: 'menu-manager',
        component: MenuManagerComponent,
      },
      {
        path: 'menu-manager/create',
        component: MenuCreateComponent,
      },
      {
        path: 'menu-manager/update/:id',
        component: MenuUpdateComponent,
      },
      {
        path: 'permission-manager',
        component: PermissionManagerComponent,
      },
      {
        path: 'permission-manager/create',
        component: PermissionCreateComponent,
      },
      {
        path: 'permission-manager/update/:id',
        component: PermissionUpdateComponent,
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
  {
    path: '**',
    component: NotFoundComponent,
  },
];
