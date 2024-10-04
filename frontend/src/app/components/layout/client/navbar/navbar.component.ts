import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matAppsOutline,
  matLightbulbOutline,
  matSearchOutline,
  matVideocamOutline,
} from '@ng-icons/material-icons/outline';
import { RouterLink } from '@angular/router';
import { AuthorizeService } from '../../../../services/authorize/authorize.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink],
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
  fullName: string = '';

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private authorize: AuthorizeService
  ) { }

  ngOnInit(): void {
    // const token = this.cookieService.get('jwtToken');
    // if (token) {
    //   this.authService.isLoggedIn = true;
    // }
    this.fullName = this.authorize.getFullName();
  }

  userInfo() {
    this.isUserInfor = !this.isUserInfor;
  }

  logout() {
    this.authService.logout();
  }
}
