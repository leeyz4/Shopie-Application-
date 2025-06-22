import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user',
//   imports: [],
//   templateUrl: './user.html',
//   styleUrl: './user.css'
// })
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role:'ADMIN' | 'CUSTOMER';
}
