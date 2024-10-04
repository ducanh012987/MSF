import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matKeyboardArrowLeftOutline,
  matKeyboardArrowRightOutline,
} from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  providers: [
    provideIcons({ matKeyboardArrowLeftOutline, matKeyboardArrowRightOutline }),
  ],
})
export class PaginationComponent {
  @Input() totalUsers: number = 0; // Tổng số người dùng
  @Input() pageSize: number = 10; // Kích thước trang
  @Input() currentPage: number = 1; // Trang hiện tại
  @Output() pageChange = new EventEmitter<number>(); // Event khi thay đổi trang

  get totalPages(): number {
    return Math.ceil(this.totalUsers / this.pageSize); // Tổng số trang
  }

  get pages(): number[] {
    const total = this.totalPages;
    return Array.from({ length: total }, (_, i) => i + 1); // Mảng [1, 2, ..., total]
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page); // Phát ra event thay đổi trang
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }
}
