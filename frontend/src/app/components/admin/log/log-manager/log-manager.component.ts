import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { PaginationComponent } from '../../../../pages/pagination/pagination.component';
import {
  matAcUnitOutline,
  matCreateOutline,
  matDatasetOutline,
  matDeleteOutline,
  matHomeOutline,
} from '@ng-icons/material-icons/outline';
import { LogService } from '../../../../services/log/log.service';
import { MatDialog } from '@angular/material/dialog';
import { LogDetailComponent } from '../log-detail/log-detail.component';
import { SearchService } from '../../../../services/search/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-manager',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink, PaginationComponent],
  templateUrl: './log-manager.component.html',
  styleUrl: './log-manager.component.scss',
  providers: [
    provideIcons({
      matHomeOutline,
      matAcUnitOutline,
      matDatasetOutline,
      matCreateOutline,
      matDeleteOutline,
    }),
  ],
})
export class LogManagerComponent implements OnInit, OnDestroy {
  allLogs: any[] = [];
  logs: any[] = [];
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalLogs: number = 0;

  searchSubscription!: Subscription;

  constructor(
    private logService: LogService,
    private dialog: MatDialog,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllLog(this.pageNumber);

    this.searchSubscription = this.searchService
      .getSearchQuery()
      .subscribe((query) => {
        this.filterLogs(query);
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  // Hàm lọc dữ liệu dựa trên từ khóa tìm kiếm
  filterLogs(query: string) {
    if (query) {
      this.logs = this.allLogs.filter((log) =>
        log.username.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.logs = this.allLogs; // Hiển thị tất cả nếu không có từ khóa
    }
  }

  getAllLog(page: number): void {
    this.logService.getAllLog(page, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.allLogs = response.data.data;
        this.logs = this.allLogs;
        this.totalLogs = response.data.totalRecords;
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

  onPageChange(page: number) {
    this.pageNumber = page; // Cập nhật trang hiện tại
    this.getAllLog(page); // Tải lại danh sách người dùng
  }

  openDetailDialog(id: number) {
    this.dialog.open(LogDetailComponent, {
      width: '600px',
      data: { id },
    });
  }
}
