import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matAppsOutline,
  matLightbulbOutline,
  matSearchOutline,
  matVideocamOutline,
} from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [
    provideIcons({
      matAppsOutline,
      matSearchOutline,
      matVideocamOutline,
      matLightbulbOutline,
    }),
  ],
})
export class NavbarComponent implements OnInit {
  isUserInfor: boolean = false;

  constructor(
    public authService: AuthService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    const token = this.cookieService.get('jwtToken');
    if (token) {
      this.authService.isLoggedIn = true;
    }
  }

  userInfo() {
    this.isUserInfor = !this.isUserInfor;
  }

  logout() {
    this.authService.logout();
  }
}
