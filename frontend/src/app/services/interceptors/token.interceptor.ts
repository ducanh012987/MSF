import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
import { catchError, filter, Subject, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizeService } from '../authorize/authorize.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  // const authService = inject(AuthService);
  // const router = inject(Router);
  // const authorize = inject(AuthorizeService);

  // Danh sách các URL không thêm token
  const excludedUrls = [
    '/Login',
    '/Register',
    '/Refresh-Token',
    '/GenerateCaptcha',
    '/ValidateCaptcha',
  ];
  // Kiểm tra nếu URL của request nằm trong danh sách excludedUrls
  const shouldExclude = excludedUrls.some((url) => req.url.includes(url));

  // Nếu URL không cần token, bỏ qua việc thêm token
  if (shouldExclude) {
    return next(req);
  }

  const tokenAccess = cookieService.get('AccessToken');

  return next(
    req.clone({
      setHeaders: {
        Authorization: `${tokenAccess}`,
      },
    })
  );
};
