import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const userData = cookieService.get('AccessToken');
  if (userData) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
