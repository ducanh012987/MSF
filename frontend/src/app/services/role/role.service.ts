import { Injectable } from '@angular/core';
import baseUrl from '../../types/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private roleUrl = `${baseUrl}/api/Role`;

  constructor(private http: HttpClient) {}

  getAllRole(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(
      `${this.roleUrl}/getAll?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get(`${this.roleUrl}/getById/${id}`);
  }

  createRole(roleName: string): Observable<any> {
    return this.http.post(`${this.roleUrl}/create?roleName=${roleName}`, {
      responseType: 'text',
      withCredentials: true,
    });
  }

  updateRole(id: number, roleName: string): Observable<any> {
    return this.http.put(`${this.roleUrl}/update/${id}?roleName=${roleName}`, {
      responseType: 'text',
      withCredentials: true,
    });
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.roleUrl}/delete/${id}`);
  }
}
