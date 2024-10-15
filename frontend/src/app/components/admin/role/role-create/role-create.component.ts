import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { RoleService } from '../../../../services/role/role.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { MenuService } from '../../../../services/menu/menu.service';
import { PermissionService } from '../../../../services/permission/permission.service';

@Component({
  selector: 'app-role-create',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    NgSelectModule,
  ],
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.scss',
  viewProviders: [
    provideIcons({
      matHomeOutline,
    }),
  ],
})
export class RoleCreateComponent implements OnInit {
  model: any = {};
  menu: any[] = []; // Danh sách menu đầy đủ
  filteredMenu: any[] = []; // Danh sách menu sau khi lọc
  permissions: any[] = []; // Danh sách permission đầy đủ
  filteredPermissions: any[] = []; // Danh sách permission sau khi lọc
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;

  statuses = [
    { value: true, name: 'Mở' },
    { value: false, name: 'Khoá' },
  ];

  constructor(
    private roleService: RoleService,
    private router: Router,
    private menuService: MenuService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllMenu();
    this.getAllPermission();
  }

  getAllMenu(): void {
    this.menuService.getAllMenu().subscribe({
      next: (response) => {
        this.menu = response.data;
        // Lọc những menu có status = true
        this.filteredMenu = this.menu.filter((menu) => menu.status === true);
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  getAllPermission(): void {
    this.permissionService.getAllPermission().subscribe({
      next: (response) => {
        this.permissions = response.data;
        // Lọc những permissions có status = true
        this.filteredPermissions = this.permissions.filter(
          (permission) => permission.status === true
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  createRole(): void {
    const createdData = this.model;
    createdData.listMenu = this.model.menuIds.map((id: any) => ({ id }));
    createdData.listPermissions = this.model.permissionIds.map((id: any) => ({
      id,
    }));

    this.roleService.createRole(createdData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        alert('Thêm thành công.');
        this.router.navigate(['/admin/role-manager']);
      },
      error: (error) => {
        alert('Đã xảy ra lỗi: ' + error);
        this.isLoading = false;
        console.log(error);
      },
    });
  }

  onSubmit() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.createRole();
  }
}
