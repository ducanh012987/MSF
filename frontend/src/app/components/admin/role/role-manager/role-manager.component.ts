import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matAcUnitOutline,
  matAddCircleOutlineOutline,
  matCreateOutline,
  matDatasetOutline,
  matDeleteOutline,
  matHomeOutline,
} from '@ng-icons/material-icons/outline';
import { PaginationComponent } from '../../../../pages/pagination/pagination.component';
import { RoleService } from '../../../../services/role/role.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../../services/search/search.service';
import { StoragePermission } from '../../../../services/storage/storage.permission';

@Component({
  selector: 'app-role-manager',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink, PaginationComponent],
  templateUrl: './role-manager.component.html',
  styleUrl: './role-manager.component.scss',
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
export class RoleManagerComponent implements OnInit, OnDestroy {
  allRoles: any[] = [];
  roles: any[] = [];
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRoles: number = 0;

  permissions: any[] = [];

  searchSubscription!: Subscription;

  constructor(
    private roleService: RoleService,
    private searchService: SearchService,
    private router: Router,
    private storagePermission: StoragePermission
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    // Lấy danh sách permissions từ localStorage
    this.permissions = this.storagePermission.getPermissions();

    this.getAllRole(this.pageNumber);

    this.searchSubscription = this.searchService
      .getSearchQuery()
      .subscribe((query) => {
        this.filterRoles(query);
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  // Hàm lọc dữ liệu dựa trên từ khóa tìm kiếm
  filterRoles(query: string) {
    if (query) {
      this.roles = this.allRoles.filter((role) =>
        role.roleName.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.roles = this.allRoles; // Hiển thị tất cả nếu không có từ khóa
    }
  }

  getAllRole(page: number): void {
    this.roleService.getAllRole(page, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.allRoles = response.data.data;
        this.roles = this.allRoles;
        this.totalRoles = response.data.totalRecords;
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
    this.getAllRole(page);
  }

  deleteRole(id: number): void {
    this.roleService.deleteRole(id).subscribe({
      next: (response) => {
        alert('Xoá thành công.');
        console.log(response);
        this.getAllRole(this.pageNumber);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  getMenu(role: { listMenu: { displayName: string }[] } | null): string {
    return role?.listMenu?.map((menu) => menu.displayName).join(', ') || '';
  }

  getPermissions(
    role: {
      listPermissions: { permissionName: string }[];
    } | null
  ): string {
    return (
      role?.listPermissions
        ?.map((permission) => permission.permissionName)
        .join(', ') || ''
    );
  }
}
