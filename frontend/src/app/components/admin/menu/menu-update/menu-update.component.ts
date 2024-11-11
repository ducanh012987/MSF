import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { MenuService } from '../../../../services/menu/menu.service';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-menu-update',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    MatRadioModule,
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
        alert('Cập nhật thất bại!');
        this.isLoading = false;
      },
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      // Đánh dấu tất cả các trường là "touched" để hiển thị lỗi
      Object.keys(form.controls).forEach((controlName) => {
        form.controls[controlName].markAsTouched();
      });
      return;
    }
    this.isLoading = true;
    this.updateMenu();
  }
}
