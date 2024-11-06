import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { UserService } from '../../../../services/user/user.service';
import { RoleService } from '../../../../services/role/role.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-user-update',
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
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss',
  viewProviders: [
    provideIcons({
      matHomeOutline,
    }),
  ],
})
export class UserUpdateComponent {
  model: any = {};
  roles: any[] = []; // Danh sách quyền đầy đủ
  filteredRoles: any[] = []; // Danh sách quyền sau khi lọc

  selectedRole: { [key: number]: boolean } = {};
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  userId!: number;

  statuses = [
    { value: false, name: 'Mở' },
    { value: true, name: 'Khoá' },
  ];

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
    this.getUserById();
    this.getAllRole(this.pageNumber);
  }

  getUserById(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (response) => {
        console.log(response);
        this.model = response.data;
        // Chuyển danh sách các quyền thành mảng roleIds
        this.model.roleIds = this.model.listRoles.map(
          (role: { id: any }) => role.id
        );

        this.model.listRoles.forEach((menu: any) => {
          this.selectedRole[menu.id] = true; // Đặt mặc định là false
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
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
    const selectedIds = this.filteredRoles
      .filter((role) => this.selectedRole[role.id])
      .map((role) => role.id);
    this.model.roleIds = selectedIds;
    return selectedIds;
  }

  updateUser(): void {
    this.getSelectedRoleIds();
    this.userService.updateUser(this.userId, this.model).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        alert('Cập nhật thành công.');
        this.router.navigate(['/admin/user-manager']);
      },
      error: (error) => {
        console.log(error);
        alert('Đã xảy ra lỗi: ' + error);
        this.isLoading = false;
      },
    });
  }

  isRoleSelected(): boolean {
    return Object.values(this.selectedRole).some((value) => value === true);
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.isRoleSelected()) {
      // Đánh dấu tất cả các trường là "touched" để hiển thị lỗi
      Object.keys(form.controls).forEach((controlName) => {
        form.controls[controlName].markAsTouched();
      });
      return;
    }
    this.isLoading = true;
    this.updateUser();
  }
}
