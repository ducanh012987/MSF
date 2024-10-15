import { Component } from '@angular/core';
import { PaginationComponent } from '../../../../pages/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import {
  matAcUnitOutline,
  matAddCircleOutlineOutline,
  matCreateOutline,
  matDatasetOutline,
  matDeleteOutline,
  matHomeOutline,
} from '@ng-icons/material-icons/outline';
import { MenuService } from '../../../../services/menu/menu.service';

@Component({
  selector: 'app-menu-manager',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink, PaginationComponent],
  templateUrl: './menu-manager.component.html',
  styleUrl: './menu-manager.component.scss',
  providers: [
    provideIcons({
      matHomeOutline,
      matAcUnitOutline,
      matDatasetOutline,
      matCreateOutline,
      matDeleteOutline,
      matAddCircleOutlineOutline,
    }),
  ],
})
export class MenuManagerComponent {
  menu: any[] = [];
  isLoading: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllMenu();
  }

  getAllMenu(): void {
    this.menuService.getAllMenu().subscribe({
      next: (response) => {
        console.log(response);
        this.menu = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  deleteMenu(id: number): void {
    this.menuService.deleteMenu(id).subscribe({
      next: (response) => {
        alert('Xoá thành công.');
        console.log(response);
        this.getAllMenu();
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
