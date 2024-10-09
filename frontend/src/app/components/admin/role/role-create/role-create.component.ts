import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { RoleService } from '../../../../services/role/role.service';

@Component({
  selector: 'app-role-create',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.scss',
  viewProviders: [
    provideIcons({
      matHomeOutline,
    }),
  ],
})
export class RoleCreateComponent implements OnInit {
  model: any = {};
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit(): void {}

  createRole(): void {
    this.roleService.createRole(this.model.roleName).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        alert('Thêm thành công.');
        this.router.navigate(['/admin/role-manager']);
      },
      error: (error) => {
        alert('Đã xảy ra lỗi: ' + error);
        this.isLoading = false;
        console.log(error);
      },
    });
  }

  onSubmit() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.createRole();
  }
}
