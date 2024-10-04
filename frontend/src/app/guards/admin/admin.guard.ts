import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizeService } from '../../services/authorize/authorize.service';
import { CookieService } from 'ngx-cookie-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authorize = inject(AuthorizeService);
  const cookieService = inject(CookieService);

  const getRefreshToken = cookieService.get('RefreshToken');
  if (getRefreshToken) {
    if (authorize.getToken()) {
      if (!authorize.hasRole('ADMIN')) {
        alert('Bạn không có quyền truy cập vào trang này!');
        router.navigate(['/home']);
        return false;
      }
      return true;
    }
    router.navigate(['/login']);
    return false;
  }
  cookieService.delete('AccessToken');
  router.navigate(['/login']);
  return false;
};
