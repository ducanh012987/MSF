import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
export class LogManagerComponent implements OnInit {
  logs: any[] = [];
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalLogs: number = 0;

  constructor(private logService: LogService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllLog(this.pageNumber);
  }

  getAllLog(page: number): void {
    this.logService.getAllLog(page, this.pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.logs = response.data.data;
        this.totalLogs = response.data.totalRecords;
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
    this.getAllLog(page); // Tải lại danh sách người dùng
  }

  openDetailDialog(id: number) {
    this.dialog.open(LogDetailComponent, {
      width: '600px',
      data: { id },
    });
  }
}
