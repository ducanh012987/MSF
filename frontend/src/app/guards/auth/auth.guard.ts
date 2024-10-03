import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizeService } from '../../services/authorize/authorize.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authorize = inject(AuthorizeService)

  // Kiểm tra role
  if (authorize.getToken()) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
