import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  user: any;
  products: any[] = [];
  cart: any[] = [];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // You can replace this with a service call to fetch products from your backend
    this.products = [
      { id: 1, name: 'Cake', description: 'Delicious chocolate cake', price: 15 },
      { id: 2, name: 'Ice Cream', description: 'Vanilla ice cream', price: 7 },
      { id: 3, name: 'Cookies', description: 'Crispy and tasty', price: 5 }
    ];
  }

  addToCart(product: any): void {
    this.cart.push(product);
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }
}