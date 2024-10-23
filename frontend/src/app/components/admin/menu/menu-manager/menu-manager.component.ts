import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../../pages/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router, RouterLink } from '@angular/router';
import {
  matAcUnitOutline,
  matAddCircleOutlineOutline,
  matCreateOutline,
  matDatasetOutline,
  matDeleteOutline,
  matHomeOutline,
} from '@ng-icons/material-icons/outline';
import { MenuService } from '../../../../services/menu/menu.service';
import { SearchService } from '../../../../services/search/search.service';
import { Subscription } from 'rxjs';
import { StoragePermission } from '../../../../services/storage/storage.permission';

@Component({
  selector: 'app-menu-manager',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink, PaginationComponent],
  templateUrl: './menu-manager.component.html',
  styleUrl: './menu-manager.component.scss',
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
export class MenuManagerComponent implements OnInit, OnDestroy {
  allMenu: any[] = [];
  menu: any[] = [];
  isLoading: boolean = false;

  permissions: any[] = [];

  searchSubscription!: Subscription;

  constructor(
    private menuService: MenuService,
    private searchService: SearchService,
    private router: Router,
    private storagePermission: StoragePermission
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    // Lấy danh sách permissions từ localStorage
    this.permissions = this.storagePermission.getPermissions();

    this.getAllMenu();

    this.searchSubscription = this.searchService
      .getSearchQuery()
      .subscribe((query) => {
        this.filterMenu(query);
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  // Hàm lọc dữ liệu dựa trên từ khóa tìm kiếm
  filterMenu(query: string) {
    if (query) {
      this.menu = this.allMenu.filter((menu) =>
        menu.displayName.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.menu = this.allMenu; // Hiển thị tất cả nếu không có từ khóa
    }
  }

  getAllMenu(): void {
    this.menuService.getAllMenu().subscribe({
      next: (response) => {
        console.log(response);
        this.allMenu = response.data;
        this.menu = this.allMenu;
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

  deleteMenu(id: number): void {
    this.menuService.deleteMenu(id).subscribe({
      next: (response) => {
        alert('Xoá thành công.');
        console.log(response);
        this.getAllMenu();
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
