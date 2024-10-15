import { Injectable } from '@angular/core';
import baseUrl from '../../types/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuUrl = `${baseUrl}/api/Menu`;

  constructor(private http: HttpClient) {}

  getAllMenu(): Observable<any> {
    return this.http.get(`${this.menuUrl}/getAll`);
  }

  getMenuById(id: number): Observable<any> {
    return this.http.get(`${this.menuUrl}/getById/${id}`);
  }

  createMenu(menu: any): Observable<any> {
    return this.http.post(`${this.menuUrl}/create`, menu, {
      responseType: 'text',
      withCredentials: true,
    });
  }

  updateMenu(id: number, menu: any): Observable<any> {
    return this.http.put(`${this.menuUrl}/update/${id}`, menu, {
      responseType: 'text',
      withCredentials: true,
    });
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete(`${this.menuUrl}/delete/${id}`);
  }
}
