import { Injectable } from '@angular/core';
import baseUrl from '../../types/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = `${baseUrl}/api/User`;

  constructor(private http: HttpClient) {}

  getAllUser(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(
      `${this.userUrl}/getAll?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.userUrl}/getById/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.userUrl}/create`, user, {
      responseType: 'text',
      withCredentials: true,
    });
  }

  updateUser(
    id: number,
    fullname: string,
    email: string,
    locked: boolean,
    roleid: number
  ): Observable<any> {
    return this.http.put(
      `${this.userUrl}/update/${id}?fullname=${fullname}&email=${email}&locked=${locked}&roleid=${roleid}`,
      {
        responseType: 'text',
        withCredentials: true,
      }
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.userUrl}/delete/${id}`);
  }
}
