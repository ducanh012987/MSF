import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { RoleService } from '../../../../services/role/role.service';
import { MenuService } from '../../../../services/menu/menu.service';
import { PermissionService } from '../../../../services/permission/permission.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'app-role-update',
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
  templateUrl: './role-update.component.html',
  styleUrl: './role-update.component.scss',
  viewProviders: [
    provideIcons({
      matHomeOutline,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RoleUpdateComponent {
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
    this.getRoleById(this.roleId);
    this.getAllMenu();
    this.getAllPermission();
  }

  getRoleById(id: number): void {
    this.roleService.getRoleById(id).subscribe({
      next: (response) => {
        console.log(response);
        this.model = response.data;

        // Chuyển danh sách các menu thành mảng menuIds
        this.model.menuIds = this.model.listMenu.map(
          (menu: { id: any }) => menu.id
        );
        // Chuyển danh sách các permission thành mảng permissionIds
        this.model.permissionIds = this.model.listPermissions.map(
          (permission: { id: any }) => permission.id
        );

        this.model.listPermissions.forEach((permission: any) => {
          this.selectedPermission[permission.id] = true; // Đặt mặc định là false
        });

        this.model.listMenu.forEach((menu: any) => {
          this.selectedMenu[menu.id] = true; // Đặt mặc định là false
        });

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
        this.permissions = response.data; // Lưu danh sách quyền

        // Lọc những permission có status = true
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
    var perIds = this.getSelectedPermissionIds();

    const selectedMenuIds = this.menu
      .filter((menu) => {
        return this.permissions.some((permission) => {
          const idMatch = perIds.includes(permission.id);
          const displayNameMatch = menu.displayName == permission.groupName;
          const permissionNameMatch =
            permission.permissionName.includes('View');
          return idMatch && displayNameMatch && permissionNameMatch;
        });
      })
      .map((menu) => menu.id);
    this.model.menuIds = selectedMenuIds;
    return selectedMenuIds;
  }

  updateRole(): void {
    this.getSelectedPermissionIds();
    this.getSelectedMenuIds();
    this.roleService.updateRole(this.roleId, this.model).subscribe({
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

  isPermissionSelected(): boolean {
    return Object.values(this.selectedPermission).some(
      (value) => value === true
    );
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.isPermissionSelected()) {
      // Đánh dấu tất cả các trường là "touched" để hiển thị lỗi
      Object.keys(form.controls).forEach((controlName) => {
        form.controls[controlName].markAsTouched();
      });
      return;
    }
    this.isLoading = true;
    this.updateRole();
  }
}
