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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-role-create',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
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
  menu: any[] = [];
  permissions: any[] = [];
  filteredMenu: any[] = []; // Danh sách menu sau khi lọc
  filteredPermissions: any[] = []; // Danh sách permission sau khi lọc

  groupedPermissions: { [key: string]: any[] } = {};
  selectedGroup: string = '';
  selectedMenu: { [key: number]: boolean } = {};
  selectedPermission: { [key: number]: boolean } = {};
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

        // Nhóm quyền theo groupName
        this.groupedPermissions = this.groupPermissions(
          this.filteredPermissions
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  // Phương thức nhóm quyền
  groupPermissions(permissions: any[]): {
    [key: string]: any[];
  } {
    const grouped = permissions.reduce((groups, permission) => {
      const groupName = permission.permissionName.split('.')[0]; // Lấy phần trước dấu chấm
      if (!groups[groupName]) {
        groups[groupName] = []; // Tạo nhóm nếu chưa tồn tại
      }
      groups[groupName].push(permission); // Thêm quyền vào nhóm
      return groups;
    }, {} as { [key: string]: any[] });

    // Sắp xếp các nhóm theo thứ tự A-Z
    return Object.keys(grouped).reduce((sortedGroups, key) => {
      sortedGroups[key] = grouped[key];
      return sortedGroups;
    }, {} as { [key: string]: any[] });
  }

  // Phương thức chọn group
  selectGroup(groupName: string): void {
    this.selectedGroup = groupName; // Cập nhật selectedGroup
  }

  onCheckboxPermissionChange(isChecked: boolean, selectedRole: any): void {
    this.selectedPermission[selectedRole.id] = isChecked;
  }

  getSelectedPermissionIds(): number[] {
    const selectedIds = this.permissions
      .filter((permission) => this.selectedPermission[permission.id])
      .map((permission) => permission.id);
    this.model.permissionIds = selectedIds;
    return selectedIds;
  }

  onCheckboxMenuChange(isChecked: boolean, selectedRole: any): void {
    this.selectedMenu[selectedRole.id] = isChecked;
  }

  getSelectedMenuIds(): number[] {
    const selectedIds = this.menu
      .filter((menu) => this.selectedMenu[menu.id])
      .map((menu) => menu.id);
    this.model.menuIds = selectedIds;
    return selectedIds;
  }

  createRole(): void {
    this.roleService.createRole(this.model).subscribe({
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
