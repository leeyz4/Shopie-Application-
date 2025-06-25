import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';
import { User } from '../../models/user/user.module';

Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})

export class Profile implements OnInit {
  user: User | null = null;
  orders: any[] = []; 
  editMode = false;
  updatedUser = { name: '', email: '' };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadOrders();
  }

  loadUserData() {
    this.userService.getCurrentUser().subscribe({
      next: (res) => {
        this.user = res.data;
        this.updatedUser = { name: res.data.name, email: res.data.email };
      },
      error: (err) => console.error('Failed to load user:', err)
    });
  }

  loadOrders() {
    // Call your order service
    this.userService.getUserOrders().subscribe({
      next: (res) => this.orders = res.data,
      error: (err) => console.error('Failed to load orders:', err)
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  updateProfile() {
    if (!this.user) return;
    this.userService.updateUser(this.user.id, this.updatedUser).subscribe({
      next: () => {
        this.user = { ...this.user!, ...this.updatedUser };
        this.editMode = false;
      },
      error: (err) => console.error('Update failed:', err)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

