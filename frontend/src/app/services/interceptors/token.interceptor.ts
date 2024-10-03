import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  // Danh sách các URL không thêm token
  const excludedUrls = ['/Login', '/Register', '/Refresh-Token'];
  // Kiểm tra nếu URL của request nằm trong danh sách excludedUrls
  const shouldExclude = excludedUrls.some((url) => req.url.includes(url));

  // Nếu URL không cần token, bỏ qua việc thêm token
  if (shouldExclude) {
    return next(req);
  }

  // Lấy token từ cookie
  const AccessToken = cookieService.get('AccessToken');

  // Nếu có token, thêm nó vào headers của request
  if (AccessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `${AccessToken}`,
      },
    });
  }

  // Gửi request tiếp tục xử lý
  return next(req);
};
