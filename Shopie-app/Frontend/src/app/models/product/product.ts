import { ClassNameUpgradeData } from './../../../../node_modules/@angular/cdk/schematics/ng-update/data/class-names.d';
import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product',
//   imports: [],
//   templateUrl: './product.html',
//   styleUrl: './product.css'
// })
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
