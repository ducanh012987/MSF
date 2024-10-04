import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline, matKeyboardArrowDownOutline, matKeyboardArrowUpOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIconComponent, CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: provideIcons({ matHomeOutline, matKeyboardArrowDownOutline, matKeyboardArrowUpOutline })
})
export class SidebarComponent {
  isCategory: boolean = false;

  category() {
    this.isCategory = !this.isCategory;
  }
}
