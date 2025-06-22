import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(product: any) {
    return this.http.post<any>(this.baseUrl, product);
  }

  update(id: string, product: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, product);
  }

  delete(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}