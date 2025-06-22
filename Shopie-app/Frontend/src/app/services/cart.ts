import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  getItems() {
    return this.cart;
  }

  add(product: any) {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  remove(productId: string) {
    this.cart = this.cart.filter(item => item.id !== productId);
  }

  clear() {
    this.cart = [];
  }
}