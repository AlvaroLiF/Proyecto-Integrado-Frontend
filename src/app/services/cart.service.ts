import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  //private url = 'http://localhost:3000';
  private url = 'https://componentx.onrender.com';
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    const userId = localStorage.getItem('userId');
    const url = `${this.url}/cart/add`;
    const headers = this.getHeaders();
    const body = { productId, quantity, userId };
    return this.http.post(url, body, { headers: headers });
  }

  getCart(): Observable<any> {
    const userId = localStorage.getItem('userId');
    const url = `${this.url}/cart/${userId}`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers: headers });
  }

  removeFromCart(productId: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    const url = `${this.url}/cart/remove/${userId}/${productId}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers: headers });
  }
}
