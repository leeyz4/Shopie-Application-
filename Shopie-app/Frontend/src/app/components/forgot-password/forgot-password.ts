import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  email = '';
  message = '';
  error = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/auth/forgot-password', { email: this.email })
      .subscribe({
        next: (res) => {
          this.message = 'Reset link sent! Please check your email.';
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Something went wrong.';
          this.message = '';
        }
      });
  }
}
