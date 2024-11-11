import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matHomeOutline,
  matKeyboardArrowDownOutline,
  matKeyboardArrowLeftOutline,
  matKeyboardArrowRightOutline,
  matKeyboardArrowUpOutline,
} from '@ng-icons/material-icons/outline';
import { StorageMenu } from '../../../../services/storage/storage.menu';
import { StoragePermission } from '../../../../services/storage/storage.permission';
import { SidebarService } from '../../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIconComponent, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: provideIcons({
    matHomeOutline,
    matKeyboardArrowDownOutline,
    matKeyboardArrowUpOutline,
    matKeyboardArrowLeftOutline,
    matKeyboardArrowRightOutline,
  }),
})
export class SidebarComponent implements OnInit {
  menu: any[] = [];
  permissions: any[] = [];

  isCategory: boolean = false;
  isSidebar: boolean = false;

  constructor(
    private storageMenu: StorageMenu,
    private storagePermission: StoragePermission,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe((visible) => {
      this.isSidebar = visible;
    });

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
