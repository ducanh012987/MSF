import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  model: any = {}
  passwordFieldType: string = 'password';

  constructor(private auth: AuthService, private router: Router) { }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  signup(registerForm: any): void {
    // debugger;
    if (registerForm.invalid) {
      alert("Bạn nhập thiếu thông tin!");
      return console.error("Bạn nhập thiếu thông tin!");
    }
    this.auth.signup(this.model).subscribe({
      next: response => {
        alert("Đăng ký thành công.");
        console.log("Đăng ký thành công", response);
        this.router.navigate(['login']);
      },
      error: err => {
        console.error(err, alert("Tên đăng nhập đã tồn tại!"));
      }
    });
  }
}
