import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  OnInit,
} from '@angular/core';
import { LogService } from '../../../../services/log/log.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-log-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-detail.component.html',
  styleUrl: './log-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LogDetailComponent implements OnInit {
  log: any = {};

  constructor(
    private logService: LogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LogDetailComponent>
  ) {}

  ngOnInit(): void {
    this.getLogById();
  }

  getLogById(): void {
    this.logService.getLogById(this.data.id).subscribe({
      next: (response) => {
        this.log = response.data;
        console.log(response);
      },
      error: (err) => {
        alert(`Đã xảy ra lỗi: ${err}`);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
