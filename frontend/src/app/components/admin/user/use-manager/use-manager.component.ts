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

@Component({
  selector: 'app-use-manager',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink],
  templateUrl: './use-manager.component.html',
  styleUrl: './use-manager.component.scss',
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
export class UseManagerComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  pages: number[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(): void {
    this.userService.getAllUser(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.users = response.data.data;
        this.totalRecords = response.data.totalRecords;
        this.calculatePages();
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  calculatePages() {
    const totalPages = Math.ceil(this.totalRecords / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1); // Tạo mảng [1, 2, ..., totalPages]
  }

  onPageChange(page: number) {
    this.pageNumber = page; // Cập nhật trang hiện tại
    this.getAllUser(); // Tải lại danh sách người dùng
  }

  editUser(user: any): void {
    // Navigate to edit user page or open a modal for editing
  }

  deleteUser(id: number): void {
    // this.userService.deleteUser(id).subscribe(() => {
    //   this.getUsers(); // Reload user list after deletion
    // });
  }
}
