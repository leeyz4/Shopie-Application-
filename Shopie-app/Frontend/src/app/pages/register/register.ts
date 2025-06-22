import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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