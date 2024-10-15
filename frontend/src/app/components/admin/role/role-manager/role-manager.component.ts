import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
export class RoleManagerComponent implements OnInit {
  roles: any[] = [];
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRoles: number = 0;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllRole(this.pageNumber);
  }

  getAllRole(page: number): void {
    this.roleService.getAllRole(page, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.roles = response.data.data;
        this.totalRoles = response.data.totalRecords;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
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
