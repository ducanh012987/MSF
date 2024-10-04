import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import baseUrl from '../../types/baseUrl';
import { AuthorizeService } from '../authorize/authorize.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessUrl = `${baseUrl}/api/Access`;
  //isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private authorize: AuthorizeService
  ) {}

  login(user: any): Observable<any> {
    return this.http.post(`${this.accessUrl}/Login`, user, {
      responseType: 'text',
      withCredentials: true,
    });
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.accessUrl}/Register`, user, {
      responseType: 'text',
      withCredentials: true,
    });
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(
      `${this.accessUrl}/Refresh-Token?refreshToken=${refreshToken}`,
      {
        withCredentials: true,
      }
    );
  }

  logout() {
    alert('Đăng xuất thành công.');
    this.cookieService.delete('AccessToken');
    this.cookieService.delete('RefreshToken');

    //this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
