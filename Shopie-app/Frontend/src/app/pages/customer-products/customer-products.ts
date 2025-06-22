import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html'
})
export class CustomerProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe((res) => {
      this.products = res.data;
    });
  }

  addToCart(product: any) {
    this.cartService.add(product);
    alert('Product added to cart!');
  }
}