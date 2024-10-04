import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizeService } from '../../services/authorize/authorize.service';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authorize = inject(AuthorizeService);
  const cookieService = inject(CookieService);

  const getRefreshToken = cookieService.get('RefreshToken');
  if (getRefreshToken) {
    // Kiểm tra token
    if (authorize.getToken()) {
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
  }
  cookieService.delete('AccessToken');
  router.navigate(['/login']);
  return false;
};
