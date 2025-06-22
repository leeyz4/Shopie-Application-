import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-admin-add-edit-product',
  templateUrl: './admin-add-edit-product.component.html',
})
export class AdminAddEditProductComponent implements OnInit {
  product = {
    name: '',
    description: '',
    price: 0,
    stock: 0
  };
  isEditMode = false;
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEditMode = true;
      this.productService.getById(this.id).subscribe((res) => {
        this.product = res.data;
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.productService.update(this.id, this.product).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.productService.create(this.product).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    }
  }
}