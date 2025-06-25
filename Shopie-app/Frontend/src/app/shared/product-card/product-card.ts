import { Component, Input } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { CartService } from '../../services/cart';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  generateStars(rating: number = 0): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return '★'.repeat(fullStars) + '½'.repeat(halfStar) + '☆'.repeat(emptyStars);
  }

  addToCart(): void {
    this.cartService.addToCart({
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
      quantity: 1
    });
  }
}

