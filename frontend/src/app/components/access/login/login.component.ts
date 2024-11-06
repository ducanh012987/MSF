import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CaptchaService } from '../../../services/captcha/captcha.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import baseUrl from '../../../types/baseUrl';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<any>;
  private lockoutTime = 60; // Thời gian khóa 60 giây
  private maxFailedAttempts = 5;
  passwordFieldType: string = 'password';
  generateCaptchaUrl = `${baseUrl}/api/Captcha/GenerateCaptcha`;
  lockoutRemainingTime: number = 0;
  interval: any;

  constructor(
    private authService: AuthService,
    public captchaService: CaptchaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.checkLockoutStatus();
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  checkLockoutStatus() {
    const lockoutEndTime = Number(localStorage.getItem('lockoutEndTime')) || 0;
    if (Date.now() < lockoutEndTime) {
      this.lockoutRemainingTime = Math.ceil(
        (lockoutEndTime - Date.now()) / 1000
      );
      this.startLockoutCountdown();
    }
  }

  startLockoutCountdown(): void {
    this.interval = setInterval(() => {
      this.lockoutRemainingTime--;
      if (this.lockoutRemainingTime <= 0) {
        clearInterval(this.interval);
        localStorage.removeItem('lockoutEndTime');
        localStorage.removeItem('failedAttempts');
      }
    }, 1000);
  }

  login(): void {
    if (this.loginForm.invalid) {
      // Đánh dấu tất cả các trường là đã được chạm để hiển thị lỗi
      this.loginForm.markAllAsTouched();
      return; // Dừng lại nếu form không hợp lệ
    }

    const enteredCatcha = (
      document.getElementById('captchaInput') as HTMLInputElement
    ).value;

    const failedAttempts = Number(localStorage.getItem('failedAttempts')) || 0;

    //debugger;
    this.captchaService
      .validateCaptcha(enteredCatcha)
      .pipe(
        switchMap((result) => {
          if (result?.success) {
            return this.authService.login(this.loginForm.value).pipe(
              tap((response) => {
                localStorage.removeItem('failedAttempts');
                localStorage.removeItem('lockoutEndTime');

                alert('Đăng nhập thành công.');
                console.log(response);
                this.lockoutRemainingTime = 0;
                //this.authService.isLoggedIn = true;
                this.router.navigate(['home']);
              }),
              catchError((error) => {
                const newFailedAttempts = failedAttempts + 1;
                localStorage.setItem(
                  'failedAttempts',
                  newFailedAttempts.toString()
                );

                if (newFailedAttempts >= this.maxFailedAttempts) {
                  const newLockoutEndTime =
                    Date.now() + this.lockoutTime * 1000;
                  localStorage.setItem(
                    'lockoutEndTime',
                    newLockoutEndTime.toString()
                  );
                  this.checkLockoutStatus();
                }

                console.error(
                  'Đăng nhập thất bại',
                  error,
                  alert('Sai tài khoản hoặc mật khẩu.')
                );
                this.captchaService.refreshCaptcha();
                return of(null);
              })
            );
          } else {
            alert('Sai mã CATCHA. Vui lòng thử lại.');
            this.captchaService.refreshCaptcha();
            return of(null);
          }
        }),
        catchError((error) => {
          alert('Vui lòng nhập mã CAPTCHA');
          console.error('Xác thực CAPTCHA thất bại', error);
          return of(null);
        })
      )
      .subscribe();
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Ngăn chặn form gửi đi ngay lập tức
    this.login(); // Xác thực CAPTCHA và đăng nhập
  }
}
