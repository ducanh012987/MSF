import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { UserService } from '../../../../services/user/user.service';
import { RoleService } from '../../../../services/role/role.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-user-create',
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
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
  viewProviders: [
    provideIcons({
      matHomeOutline,
    }),
  ],
})
export class UserCreateComponent implements OnInit {
  model: any = {};
  roles: any[] = [];
  filteredRoles: any[] = [];

  selectedRole: { [key: number]: boolean } = {};
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;

  statuses = [
    { value: false, name: 'Mở' },
    { value: true, name: 'Khoá' },
  ];

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllRole(this.pageNumber);
  }

  getAllRole(pageNumber: number): void {
    this.roleService.getAllRole(pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.roles = response.data.data;
        // Lọc những quyền có status = true
        this.filteredRoles = this.roles.filter((role) => role.status === true);
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  onCheckboxRoleChange(isChecked: boolean, selectedRole: any): void {
    this.selectedRole[selectedRole.id] = isChecked;
  }

  getSelectedRoleIds(): number[] {
    const selectedIds = this.roles
      .filter((role) => this.selectedRole[role.id])
      .map((role) => role.id);
    this.model.roleIds = selectedIds;
    return selectedIds;
  }

  createUser(): void {
    this.userService.createUser(this.model).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        alert('Thêm thành công.');
        this.router.navigate(['/admin/user-manager']);
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
    this.createUser();
  }
}
