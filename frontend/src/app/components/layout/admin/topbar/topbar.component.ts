import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matNotificationsOutline, matPersonOutline, matSearchOutline } from '@ng-icons/material-icons/outline';
import { AuthService } from '../../../../services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgIconComponent, CommonModule, RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  providers: provideIcons({ matSearchOutline, matNotificationsOutline, matPersonOutline })
})
export class TopbarComponent {
  isAvatar: boolean = false;

  constructor(private authService: AuthService) { }

  avatar() {
    this.isAvatar = !this.isAvatar;
  }

  logout() {
    this.authService.logout();
  }
}
