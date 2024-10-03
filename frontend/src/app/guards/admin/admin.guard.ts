import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorizeService } from '../../services/authorize/authorize.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authorize = inject(AuthorizeService);

  // Kiểm tra role
  if (authorize.hasRole('ADMIN')) {
    return true;
  } else {
    alert("Bạn không có quyền truy cập vào trang này!");
    router.navigate(['/home'])
    return false;
  }
};

