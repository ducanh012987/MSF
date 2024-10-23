import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matNotificationsOutline,
  matPersonOutline,
  matSearchOutline,
} from '@ng-icons/material-icons/outline';
import { AuthService } from '../../../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { SearchService } from '../../../../services/search/search.service';
import { FormsModule } from '@angular/forms';

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
  }),
})
export class TopbarComponent {
  isAvatar: boolean = false;
  searchText = '';

  constructor(
    private authService: AuthService,
    private searchService: SearchService
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
}
