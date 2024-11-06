import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matMenuOutline,
  matNotificationsOutline,
  matPersonOutline,
  matSearchOutline,
} from '@ng-icons/material-icons/outline';
import { AuthService } from '../../../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { SearchService } from '../../../../services/search/search.service';
import { FormsModule } from '@angular/forms';
import { SidebarService } from '../../../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgIconComponent, CommonModule, RouterLink, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  providers: provideIcons({
    matSearchOutline,
    matNotificationsOutline,
    matPersonOutline,
    matMenuOutline,
  }),
})
export class TopbarComponent {
  isAvatar: boolean = false;
  searchText = '';

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private sidebarService: SidebarService
  ) {}

  avatar() {
    this.isAvatar = !this.isAvatar;
  }

  logout() {
    this.authService.logout();
  }

  onSearchChange() {
    this.searchService.setSearchQuery(this.searchText);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
