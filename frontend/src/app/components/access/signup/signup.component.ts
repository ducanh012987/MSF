import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  registerForm: FormGroup<any>;
  passwordFieldType: string = 'password';

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),
        ],
      ],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  signup(): void {
    if (this.registerForm.invalid) {
      // Đánh dấu tất cả các trường là đã được chạm để hiển thị lỗi
      this.registerForm.markAllAsTouched();
      return; // Dừng lại nếu form không hợp lệ
    }

    this.auth.signup(this.registerForm.value).subscribe({
      next: (response) => {
        alert('Đăng ký thành công.');
        console.log('Đăng ký thành công', response);
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.error(err, alert('Tên người dùng đã tồn tại!'));
      },
    });
  }
}
