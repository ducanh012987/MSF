import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matHomeOutline,
  matKeyboardArrowDownOutline,
  matKeyboardArrowUpOutline,
} from '@ng-icons/material-icons/outline';
import { StorageMenu } from '../../../../services/storage/storage.menu';
import { StoragePermission } from '../../../../services/storage/storage.permission';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIconComponent, CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: provideIcons({
    matHomeOutline,
    matKeyboardArrowDownOutline,
    matKeyboardArrowUpOutline,
  }),
})
export class SidebarComponent implements OnInit {
  menu: any[] = [];
  permissions: any[] = [];

  isCategory: boolean = false;

  constructor(
    private storageMenu: StorageMenu,
    private storagePermission: StoragePermission
  ) {}

  ngOnInit(): void {
    // Lấy danh sách menu, permissions từ localStorage và parse thành mảng
    // const storedMenu = localStorage.getItem('menu');
    // const storedPermissions = localStorage.getItem('permissions');
    // this.menu = storedMenu ? JSON.parse(storedMenu) : [];
    // this.permissions = storedPermissions ? JSON.parse(storedPermissions) : [];

    // Lọc menu trùng nhau dựa trên 'id' hoặc 'displayName'
    const uniqueMenus = this.getUniqueMenus(this.menu);

    // Lọc và sắp xếp menu trước khi gán
    // this.menu = uniqueMenus
    //   .filter((menu) => this.canViewMenu(menu)) // Lọc menu dựa trên permissions
    //   .sort(this.sortMenus); // Sắp xếp menu

    this.storageMenu.menu$.subscribe((menu) => {
      this.storagePermission.permissions$.subscribe((permissions) => {
        this.permissions = permissions;
        // Lọc menu trước khi gán
        this.menu = menu
          .filter((menu) => this.canViewMenu(menu)) // Filter based on permissions
          .sort(this.sortMenus); // Apply sorting
      });
    });
  }

  getUniqueMenus(menus: any[]): any[] {
    const seen = new Set();
    return menus.filter((menu) => {
      const key = menu.id || menu.displayName; // Xác định tiêu chí so sánh trùng lặp
      if (seen.has(key)) {
        return false; // Nếu đã gặp trước đó thì bỏ qua
      }
      seen.add(key);
      return true; // Nếu chưa gặp, giữ lại menu này
    });
  }

  canViewMenu(menu: any): boolean {
    return this.permissions.some((permission) => {
      // Tách phần trước dấu '.' trong permissionName
      const permissionEntity = permission.split('.')[0];
      const isViewPermission = permission.endsWith('.View');
      return permissionEntity === menu.displayName && isViewPermission;
    });
  }

  sortMenus(a: any, b: any): number {
    return a.order - b.order; // Sắp xếp menu theo thuộc tính 'order'
  }

  category() {
    this.isCategory = !this.isCategory;
  }
}
