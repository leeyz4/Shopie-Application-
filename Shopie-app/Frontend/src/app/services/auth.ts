import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // change if different

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/users`, data);
  }
}