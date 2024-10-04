import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  constructor(private cookieService: CookieService) {}

  getToken(): string | null {
    return this.cookieService.get('AccessToken'); // 'AccessToken' là tên cookie chứa token
  }

  checkTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // JWT exp is in seconds, convert to ms
      const currentTime = Date.now();
      const timeRemaining = expirationTime - currentTime;

      return timeRemaining <= 30 * 1000;
    }
    return false;
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const role =
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      return role;
    }
    return [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  getFullName(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.FullName;
    }
  }
}
