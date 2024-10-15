import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
export class PermissionManagerComponent {
  permissions: any[] = [];
  isLoading: boolean = false;

  constructor(private permissionService: PermissionService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllPermission();
  }

  getAllPermission(): void {
    this.permissionService.getAllPermission().subscribe({
      next: (response) => {
        console.log(response);
        this.permissions = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
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
