import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { PermissionService } from '../../../../services/permission/permission.service';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-permission-update',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    MatRadioModule,
  ],
  templateUrl: './permission-update.component.html',
  styleUrl: './permission-update.component.scss',
  viewProviders: [
    provideIcons({
      matHomeOutline,
    }),
  ],
})
export class PermissionUpdateComponent {
  model: any = {};
  isLoading: boolean = false;
  permissionId!: number;

  statuses = [
    { value: true, name: 'Mở' },
    { value: false, name: 'Khoá' },
  ];

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.permissionId = params['id'];
    });

    this.getPermissionById();
  }

  getPermissionById(): void {
    this.permissionService.getPermissionById(this.permissionId).subscribe({
      next: (response) => {
        this.model = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  updatePermission(): void {
    this.permissionService
      .updatePermission(this.permissionId, this.model)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          alert('Cập nhật thành công.');
          this.router.navigate(['/admin/permission-manager']);
        },
        error: (error) => {
          console.log(error);
          alert('Cập nhật thất bại');
          this.isLoading = false;
        },
      });
  }

  onSubmit() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.updatePermission();
  }
}
