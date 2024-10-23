import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageMenu {
  private menuSubject = new BehaviorSubject<any[]>([]);

  get menu$() {
    return this.menuSubject.asObservable();
  }

  setMenu(menu: any[]) {
    this.menuSubject.next(menu);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  getMenu(): any[] {
    // Kiểm tra nếu `menusSubject` có dữ liệu thì trả về
    const currentMenu = this.menuSubject.getValue();
    if (currentMenu && currentMenu.length > 0) {
      return currentMenu;
    }

    // Nếu không, lấy từ `localStorage` và cập nhật lại `menusSubject`
    const storedMenu = localStorage.getItem('menu');
    if (storedMenu) {
      const parsedMenu = JSON.parse(storedMenu);
      this.menuSubject.next(parsedMenu);
      return parsedMenu;
    }

    // Nếu không có gì thì trả về mảng rỗng
    return [];
  }
}
