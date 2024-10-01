import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessUrl = 'https://localhost:44300/api/Access';
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  login(user: any): Observable<any> {
    return this.http.post(`${this.accessUrl}/Login`, user, { responseType: 'text', withCredentials: true }
    );
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.accessUrl}/Register`, user, { responseType: 'text', withCredentials: true });
  }

  logout() {
    alert("Đăng xuất thành công.");
    this.cookieService.delete('AccessToken');

    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
