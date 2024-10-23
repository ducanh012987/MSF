import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { PaginationComponent } from '../../../../pages/pagination/pagination.component';
import {
  matAcUnitOutline,
  matAddCircleOutlineOutline,
  matCreateOutline,
  matDatasetOutline,
  matDeleteOutline,
  matHomeOutline,
} from '@ng-icons/material-icons/outline';
import { PermissionService } from '../../../../services/permission/permission.service';
import { SearchService } from '../../../../services/search/search.service';
import { Subscription } from 'rxjs';
import { StoragePermission } from '../../../../services/storage/storage.permission';

@Component({
  selector: 'app-permission-manager',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink, PaginationComponent],
  templateUrl: './permission-manager.component.html',
  styleUrl: './permission-manager.component.scss',
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
export class PermissionManagerComponent implements OnInit, OnDestroy {
  allPermissions: any[] = [];
  permissions: any[] = [];
  isLoading: boolean = false;

  haspermissions: any[] = [];

  searchSubscription!: Subscription;

  constructor(
    private permissionService: PermissionService,
    private searchService: SearchService,
    private router: Router,
    private storagePermission: StoragePermission
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    // Lấy danh sách permissions từ localStorage
    this.haspermissions = this.storagePermission.getPermissions();

    this.getAllPermission();

    this.searchSubscription = this.searchService
      .getSearchQuery()
      .subscribe((query) => {
        this.filterPermissions(query);
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  hasPermission(permission: string): boolean {
    return this.haspermissions.includes(permission);
  }

  // Hàm lọc dữ liệu dựa trên từ khóa tìm kiếm
  filterPermissions(query: string) {
    if (query) {
      this.permissions = this.allPermissions.filter(
        (permission) =>
          permission.permissionName
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          permission.displayName.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.permissions = this.allPermissions; // Hiển thị tất cả nếu không có từ khóa
    }
  }

  getAllPermission(): void {
    this.permissionService.getAllPermission().subscribe({
      next: (response) => {
        console.log(response);
        this.allPermissions = response.data;
        this.permissions = this.allPermissions;
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

  deletePermission(id: number): void {
    this.permissionService.deletePermission(id).subscribe({
      next: (response) => {
        alert('Xoá thành công.');
        console.log(response);
        this.getAllPermission();
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
