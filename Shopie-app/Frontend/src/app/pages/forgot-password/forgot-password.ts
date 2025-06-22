import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
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