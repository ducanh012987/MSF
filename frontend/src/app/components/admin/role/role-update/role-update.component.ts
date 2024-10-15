import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { RoleService } from '../../../../services/role/role.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { MenuService } from '../../../../services/menu/menu.service';
import { PermissionService } from '../../../../services/permission/permission.service';

@Component({
  selector: 'app-role-update',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    NgSelectModule,
  ],
  templateUrl: './role-update.component.html',
  styleUrl: './role-update.component.scss',
  viewProviders: [
    provideIcons({
      matHomeOutline,
    }),
  ],
})
export class RoleUpdateComponent {
  model: any = {};
  menu: any[] = []; // Danh sách menu đầy đủ
  filteredMenu: any[] = []; // Danh sách menu sau khi lọc
  permissions: any[] = []; // Danh sách permission đầy đủ
  filteredPermissions: any[] = []; // Danh sách permission sau khi lọc
  isLoading: boolean = false;
  roleId!: number;

  statuses = [
    { value: true, name: 'Mở' },
    { value: false, name: 'Khoá' },
  ];

  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.roleId = params['id'];
    });
    this.getRoleById();
    this.getAllMenu();
    this.getAllPermission();
  }

  getRoleById(): void {
    this.roleService.getRoleById(this.roleId).subscribe({
      next: (response) => {
        this.model = response.data;
        // Chuyển danh sách các menu thành mảng menuIds
        this.model.menuIds = this.model.listMenu.map(
          (menu: { id: any }) => menu.id
        );
        // Chuyển danh sách các permission thành mảng permissionIds
        this.model.permissionIds = this.model.listPermissions.map(
          (permission: { id: any }) => permission.id
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
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

  updateRole(): void {
    const updatedData = this.model;
    updatedData.listMenu = this.model.menuIds.map((id: any) => ({ id }));
    updatedData.listPermissions = this.model.permissionIds.map((id: any) => ({
      id,
    }));

    this.roleService.updateRole(this.roleId, updatedData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        alert('Cập nhật thành công.');
        this.router.navigate(['/admin/role-manager']);
      },
      error: (error) => {
        console.log(error);
        alert('Đã xảy ra lỗi: ' + error);
        this.isLoading = false;
      },
    });
  }

  onSubmit() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.updateRole();
  }
}
