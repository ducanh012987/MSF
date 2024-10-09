import { Injectable } from '@angular/core';
import baseUrl from '../../types/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logUrl = `${baseUrl}/api/Log`;

  constructor(private http: HttpClient) {}

  getAllLog(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(
      `${this.logUrl}/getAll?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getLogById(id: number): Observable<any> {
    return this.http.get(`${this.logUrl}/getById/${id}`);
  }
}
