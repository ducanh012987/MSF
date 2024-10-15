import { Component, OnInit } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../../../pages/pagination/pagination.component';

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
export class UserManagerComponent implements OnInit {
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllUser(this.pageNumber);
  }

  getAllUser(page: number): void {
    this.userService.getAllUser(page, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.users = response.data.data;
        this.totalUsers = response.data.totalRecords;
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
