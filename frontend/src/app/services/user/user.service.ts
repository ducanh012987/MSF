import { Injectable } from '@angular/core';
import baseUrl from '../../types/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private accessUrl = `${baseUrl}/api/User`;

  constructor(private http: HttpClient) {}

  getAllUser(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.accessUrl}/getAll`, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
      },
    });
  }
}
