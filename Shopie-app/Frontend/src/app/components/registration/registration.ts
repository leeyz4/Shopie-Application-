import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class Registration {
  formData = {
    name: '',
    email: '',
    password: ''
  };

  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.formData).subscribe({
      next: (res: any) => {
        this.successMessage = 'Registration successful! You can now log in.';
        this.errorMessage = '';
        this.formData = { name: '', email: '', password: '' };
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err.error.message || 'Registration failed';
      }
    });
  }
}
