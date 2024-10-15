import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserService } from '../../../../services/user/user.service';
import { RoleService } from '../../../../services/role/role.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    NgSelectModule,
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

  getUserById(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (response) => {
        this.model = response.data;
        // Chuyển danh sách các quyền thành mảng roleIds
        this.model.roleIds = this.model.listRoles.map(
          (role: { id: any }) => role.id
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  updateUser(): void {
    const updatedData = this.model;
    // Chuyển roleIds thành danh sách quyền cần gửi
    updatedData.listRoles = this.model.roleIds.map((id: any) => ({ id }));

    this.userService.updateUser(this.userId, updatedData).subscribe({
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

  onSubmit() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.updateUser();
  }
}
