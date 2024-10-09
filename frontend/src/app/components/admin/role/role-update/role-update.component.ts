import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { RoleService } from '../../../../services/role/role.service';

@Component({
  selector: 'app-role-update',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './role-update.component.html',
  styleUrl: './role-update.component.scss',
  viewProviders: [
    provideIcons({
      matHomeOutline,
    }),
  ],
})
export class RoleUpdateComponent {
  model: any = {};
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  roleId!: number;

  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.roleId = params['id'];
    });
    this.getRoleById();
  }

  getRoleById(): void {
    this.roleService.getRoleById(this.roleId).subscribe({
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

  updateRole(): void {
    this.roleService.updateRole(this.roleId, this.model.roleName).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        alert('Cập nhật thành công.');
        this.router.navigate(['/admin/role-manager']);
      },
      error: (error) => {
        console.log(error);
        alert('Đã xảy ra lỗi: ' + error);
        this.isLoading = false;
      },
    });
  }

  onSubmit() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.updateRole();
  }
}
