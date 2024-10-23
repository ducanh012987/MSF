import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  // Lấy danh sách permissions từ localStorage và parse thành mảng
  const storedPermissions = localStorage.getItem('permissions');
  const permissions = storedPermissions ? JSON.parse(storedPermissions) : [];

  // Kiểm tra xem có bất kỳ quyền nào kết thúc bằng '.View'
  const hasViewPermission = permissions.some((perm: string) =>
    perm.endsWith('.View')
  );

  if (hasViewPermission) {
    return true; // Người dùng có quyền, cho phép truy cập
  } else {
    alert('Bạn không có quyền truy cập!');
    return false; // Chặn truy cập
  }
};
