import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { NgSelectModule } from '@ng-select/ng-select';
import { MenuService } from '../../../../services/menu/menu.service';

@Component({
  selector: 'app-menu-update',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    NgSelectModule,
  ],
  templateUrl: './menu-update.component.html',
  styleUrl: './menu-update.component.scss',
  viewProviders: [
    provideIcons({
      matHomeOutline,
    }),
  ],
})
export class MenuUpdateComponent {
  model: any = {};
  isLoading: boolean = false;
  menuId!: number;

  statuses = [
    { value: true, name: 'Mở' },
    { value: false, name: 'Khoá' },
  ];

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.menuId = params['id'];
    });
    this.getMenuById();
  }

  getMenuById(): void {
    this.menuService.getMenuById(this.menuId).subscribe({
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

  updateMenu(): void {
    this.menuService.updateMenu(this.menuId, this.model).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        alert('Cập nhật thành công.');
        this.router.navigate(['/admin/menu-manager']);
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
    this.updateMenu();
  }
}
