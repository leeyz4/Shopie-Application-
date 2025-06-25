import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user/user.module';
import { Order } from '../models/order/order.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  // Get current user data
  getCurrentUser(): Observable<{ data: User }> {
    return this.http.get<{ data: User }>(`${this.apiUrl}/users/me`);
  }

  // Update user profile
  updateUser(userId: string, updates: { name: string; email: string }): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${userId}`, updates);
  }

  // Get user's orders
  getUserOrders(): Observable<{ data: Order[] }> {
    return this.http.get<{ data: Order[] }>(`${this.apiUrl}/orders/my-orders`);
  }
}
