import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matFirstPageOutline,
  matKeyboardArrowLeftOutline,
  matKeyboardArrowRightOutline,
  matLastPageOutline,
} from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  providers: [
    provideIcons({
      matKeyboardArrowLeftOutline,
      matKeyboardArrowRightOutline,
      matFirstPageOutline,
      matLastPageOutline,
    }),
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
    const current = this.currentPage;
    const maxVisiblePages = 5;

    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(total, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => i + startPage
    );
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

  goToFirstPage() {
    if (this.currentPage !== 1) {
      this.onPageChange(1);
    }
  }

  goToLastPage() {
    if (this.currentPage !== this.totalPages) {
      this.onPageChange(this.totalPages);
    }
  }
}
