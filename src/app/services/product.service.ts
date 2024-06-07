import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  private url = 'http://localhost:3000';
  //private url = 'https://componentx.onrender.com';

  getAllProducts(): Observable<any> {
    const url = `${this.url}/products`;
    const headers = this.authService.getHeaders();
    return this.http.get(url, {headers:headers});
  }

  getFeaturedProducts(): Observable<any> {
    const url = `${this.url}/featured`;
    const headers = this.authService.getHeaders();
    return this.http.get(url, {headers:headers});
  }

  getProductDetails(productId: string): Observable<any> {
    const url = `${this.url}/products/${productId}`;
    const headers = this.authService.getHeaders();
    return this.http.get(url, {headers:headers});
  }

  searchProducts(searchTerm: string): Observable<any[]> {
    const url = `${this.url}/search?searchTerm=${searchTerm}`;
    const headers = this.authService.getHeaders();
    return this.http.get<any[]>(url, {headers:headers});
  }

  createProduct(productData: any): Observable<any> {
    const url = `${this.url}/product/add`; // Endpoint para crear un producto
    const headers = this.authService.getHeaders();
    return this.http.post(url, productData, { headers: headers });
  }

  getCategories(): Observable<any> {
    const url = `${this.url}/categories`;
    const headers = this.authService.getHeaders();
    return this.http.get(url, {headers:headers});
  }

  getProductsByCategory(categoryName: string): Observable<any> {
    const url = `${this.url}/category/${categoryName}`;
    const headers = this.authService.getHeaders();
    return this.http.get(url, {headers:headers});
  }

  deleteProduct(productId: string): Observable<any> {
    const url = `${this.url}/products/${productId}`; // URL para obtener un pedido por su ID
    const headers = this.authService.getHeaders();
    return this.http.delete(url, { headers: headers });
  }

  updateProduct(productId: string, productData: any): Observable<any> {
    const url = `${this.url}/products/${productId}`;
    const headers = this.authService.getHeaders();
    return this.http.put(url, productData, { headers: headers });
  }
  

}
