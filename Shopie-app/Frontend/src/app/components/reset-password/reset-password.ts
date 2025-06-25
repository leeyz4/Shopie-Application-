import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword {
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

