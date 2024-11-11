import { Component } from '@angular/core';
import { PermissionService } from '../../../../services/permission/permission.service';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-permission-create',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    MatRadioModule,
  ],
  templateUrl: './permission-create.component.html',
  styleUrl: './permission-create.component.scss',
  viewProviders: [
    provideIcons({
      matHomeOutline,
    }),
  ],
})
export class PermissionCreateComponent {
  model: any = {
    permissionName: '',
    displayName: '',
    status: null,
  };
  isLoading: boolean = false;

  statuses = [
    { value: true, name: 'Mở' },
    { value: false, name: 'Khoá' },
  ];

  constructor(
    private router: Router,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {}

  createRole(): void {
    this.permissionService.createPermission(this.model).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        alert('Thêm thành công.');
        this.router.navigate(['/admin/permission-manager']);
      },
      error: (error) => {
        alert('Thêm mới thất bại!');
        this.isLoading = false;
        console.log(error);
      },
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      // Đánh dấu tất cả các trường là "touched" để hiển thị lỗi
      Object.keys(form.controls).forEach((controlName) => {
        form.controls[controlName].markAsTouched();
      });
      return;
    }
    this.isLoading = true;
    this.createRole();
  }
}
