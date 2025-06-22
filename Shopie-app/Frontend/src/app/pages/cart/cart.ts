import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  remove(id: string) {
    this.cartService.remove(id);
    this.cartItems = this.cartService.getItems();
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  checkout() {
    alert('Order placed successfully!');
    this.cartService.clear();
    this.cartItems = [];
  }
}