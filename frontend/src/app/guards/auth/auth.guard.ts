import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizeService } from '../../services/authorize/authorize.service';
import { CookieService } from 'ngx-cookie-service';
import { of, switchMap, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authorize = inject(AuthorizeService);
  const cookieService = inject(CookieService);

  const getRefreshToken = cookieService.get('RefreshToken');
  if (getRefreshToken) {
    return authorize.checkTokenExpired().pipe(
      switchMap((token) => {
        if (token) {
          return of(true);
        }
        router.navigate(['/login']);
        return of(false);
      }),
      tap((canActivate) => {
        if (!canActivate) {
          console.log('Đã xảy ra lỗi khi làm mới token!');
          cookieService.delete('AccessToken');
          cookieService.delete('RefreshToken');
          router.navigate(['/login']);
        }
      })
    );
  }
  cookieService.delete('AccessToken');
  cookieService.delete('RefreshToken');
  router.navigate(['/login']);
  return false;
};
