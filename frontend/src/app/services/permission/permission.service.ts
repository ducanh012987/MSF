import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from '../../types/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private permissionUrl = `${baseUrl}/api/Permission`;

  constructor(private http: HttpClient) {}

  getAllPermission(): Observable<any> {
    return this.http.get(`${this.permissionUrl}/getAll`);
  }

  getPermissionById(id: number): Observable<any> {
    return this.http.get(`${this.permissionUrl}/getById/${id}`);
  }

  createPermission(permission: any): Observable<any> {
    return this.http.post(`${this.permissionUrl}/create`, permission, {
      responseType: 'text',
      withCredentials: true,
    });
  }

  updatePermission(id: number, permission: any): Observable<any> {
    return this.http.put(`${this.permissionUrl}/update/${id}`, permission, {
      responseType: 'text',
      withCredentials: true,
    });
  }

  deletePermission(id: number): Observable<any> {
    return this.http.delete(`${this.permissionUrl}/delete/${id}`);
  }
}
