import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../auth/auth.service';
import { catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  constructor(
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  getAccessToken(): string | null {
    return this.cookieService.get('AccessToken');
  }

  checkTokenExpired() {
    const token = this.getAccessToken();
    if (!token) {
      return this.refreshToken();
    }
    return of(token);
  }

  refreshToken() {
    const token = this.cookieService.get('RefreshToken');
    return this.authService.refreshToken(token).pipe(
      switchMap((response) => {
        console.log(response);

        this.cookieService.set('AccessToken', response.data.accessToken, {
          expires: new Date(new Date().getTime() + 30 * 60000),
          path: '/',
          domain: 'localhost',
          secure: true,
          sameSite: 'None',
        });

        return of(response.data.accessToken);
      }),
      catchError((error) => {
        console.log('Không thể làm mới token. Lỗi: ' + error);
        return of();
      })
    );
  }

  getRoles(): string[] {
    const token = this.getAccessToken();
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
    const token = this.getAccessToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.FullName;
    }
  }
}
