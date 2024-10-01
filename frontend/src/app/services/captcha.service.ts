import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CaptchaValidationResponse {
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  private captchaUrl = 'https://localhost:44300/api/Captcha';

  constructor(private http: HttpClient) { }

  refreshCaptcha(): void {
    const captchaImage = document.getElementById('captchaImage') as HTMLImageElement;
    captchaImage.src = `${this.captchaUrl}/GenerateCaptcha?${new Date().getTime()}`;
  }

  validateCaptcha(captcha: string): Observable<CaptchaValidationResponse> {
    return this.http.post<CaptchaValidationResponse>(`${this.captchaUrl}/ValidateCaptcha`, { captcha });
  }
}
