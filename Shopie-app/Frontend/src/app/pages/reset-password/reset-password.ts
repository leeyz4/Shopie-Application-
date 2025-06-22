import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  password = '';
  token = '';
  message = '';
  error = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmit() {
    this.http.post<any>('http://localhost:3000/auth/reset-password', {
      token: this.token,
      newPassword: this.password,
    }).subscribe({
      next: () => {
        this.message = 'Password reset successful!';
        this.error = '';
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to reset password.';
        this.message = '';
      }
    });
  }
}