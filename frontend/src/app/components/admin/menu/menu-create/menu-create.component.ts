import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';
import { MenuService } from '../../../../services/menu/menu.service';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-menu-create',
  standalone: true,
  imports: [
    NgIconComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    MatRadioModule,
  ],
  templateUrl: './menu-create.component.html',
  styleUrl: './menu-create.component.scss',
  viewProviders: [
    provideIcons({
      matHomeOutline,
    }),
  ],
})
export class MenuCreateComponent {
  model: any = {};
  isLoading: boolean = false;

  statuses = [
    { value: true, name: 'Mở' },
    { value: false, name: 'Khoá' },
  ];

  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit(): void {}

  createRole(): void {
    this.menuService.createMenu(this.model).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);
        alert('Thêm thành công.');
        this.router.navigate(['/admin/menu-manager']);
      },
      error: (error) => {
        alert('Đã xảy ra lỗi: ' + error);
        this.isLoading = false;
        console.log(error);
      },
    });
  }

  isStatusSelected(): boolean {
    return this.model.status != null;
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.isStatusSelected()) {
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
