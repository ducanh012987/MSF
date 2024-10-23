import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Service này sẽ được dùng ở mọi nơi mà không cần import
})
export class StoragePermission {
  private permissionsSubject = new BehaviorSubject<any[]>([]);

  // Trả về Observable để lắng nghe thay đổi nếu cần
  get permissions$() {
    return this.permissionsSubject.asObservable();
  }

  setPermissions(permissions: any[]) {
    this.permissionsSubject.next(permissions);
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  getPermissions(): any[] {
    // Kiểm tra nếu `permissionsSubject` có dữ liệu thì trả về
    const currentPermissions = this.permissionsSubject.getValue();
    if (currentPermissions && currentPermissions.length > 0) {
      return currentPermissions;
    }

    // Nếu không, lấy từ `localStorage` và cập nhật lại `permissionsSubject`
    const storedPermissions = localStorage.getItem('permissions');
    if (storedPermissions) {
      const parsedPermissions = JSON.parse(storedPermissions);
      this.permissionsSubject.next(parsedPermissions);
      return parsedPermissions;
    }

    // Nếu không có gì thì trả về mảng rỗng
    return [];
  }
}
