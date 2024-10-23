import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import {
  matAcUnitOutline,
  matAddCircleOutlineOutline,
  matCreateOutline,
  matDatasetOutline,
  matDeleteOutline,
  matHomeOutline,
} from '@ng-icons/material-icons/outline';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router, RouterLink } from '@angular/router';
import { PaginationComponent } from '../../../../pages/pagination/pagination.component';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../../services/search/search.service';
import { PermissionService } from '../../../../services/permission/permission.service';
import { StoragePermission } from '../../../../services/storage/storage.permission';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink, PaginationComponent],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.scss',
  providers: [
    provideIcons({
      matHomeOutline,
      matAcUnitOutline,
      matDatasetOutline,
      matCreateOutline,
      matDeleteOutline,
      matAddCircleOutlineOutline,
    }),
  ],
})
export class UserManagerComponent implements OnInit, OnDestroy {
  allUsers: any[] = [];
  users: {
    id: number;
    username: string;
    password: string;
    fullname: string;
    email: string;
    locked: boolean;
    listRoles: {
      id: number;
      roleName: string;
      status: boolean;
    }[];
  }[] = [];
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalUsers: number = 0;

  permissions: any[] = [];

  searchSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private router: Router,
    private storagePermission: StoragePermission
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    // Lấy danh sách permissions từ localStorage
    this.permissions = this.storagePermission.getPermissions();

    this.getAllUser(this.pageNumber);

    this.searchSubscription = this.searchService
      .getSearchQuery()
      .subscribe((query) => {
        this.filterUsers(query);
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  // Hàm lọc dữ liệu dựa trên từ khóa tìm kiếm
  filterUsers(query: string) {
    if (query) {
      this.users = this.allUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(query.toLowerCase()) ||
          user.fullname.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.users = this.allUsers; // Hiển thị tất cả nếu không có từ khóa
    }
  }

  getAllUser(page: number): void {
    this.userService.getAllUser(page, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.allUsers = response.data.data;
        this.users = this.allUsers;
        this.totalUsers = response.data.totalRecords;
        this.isLoading = false;
      },
      error: (error) => {
        alert('Bạn không có quyền!');
        console.log(error);
        this.isLoading = false;
        return this.router.navigate(['/admin']);
      },
    });
  }

  onPageChange(page: number) {
    this.pageNumber = page; // Cập nhật trang hiện tại
    this.getAllUser(page); // Tải lại danh sách người dùng
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        alert('Xoá thành công.');
        console.log(response);
        this.getAllUser(this.pageNumber);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  getRoleNames(user: { listRoles: { roleName: string }[] }): string {
    return user.listRoles.map((role) => role.roleName).join(', ');
  }
}
