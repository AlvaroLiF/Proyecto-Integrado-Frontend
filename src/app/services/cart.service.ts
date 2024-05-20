import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject: BehaviorSubject<any> = new BehaviorSubject<any>({ items: [] });
  cart$: Observable<any[]> = this.cartSubject.asObservable();
  private isCartOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isCartOpen$: Observable<boolean> = this.isCartOpenSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }

  //private url = 'http://localhost:3000';
  private url = 'https://componentx.onrender.com';

  addToCart(productId: string, quantity: number): Observable<any> {
    const userId = localStorage.getItem('userId');
    const url = `${this.url}/cart/add`;
    const headers = this.authService.getHeaders();
    const body = { productId, quantity, userId };
    return this.http.post(url, body, { headers: headers }).pipe(
      tap(() => {
        this.updateCart();
      })
    );
  }

  getCart(): Observable<any[]> {
    const userId = localStorage.getItem('userId');
    const url = `${this.url}/cart/${userId}`;
    const headers = this.authService.getHeaders();
    return this.http.get<any[]>(url, { headers: headers }).pipe(
      tap((cartItems: any[]) => {
        this.cartSubject.next(cartItems);
      })
    );
  }

  removeFromCart(productId: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    const url = `${this.url}/cart/remove/${userId}/${productId}`;
    const headers = this.authService.getHeaders();
    return this.http.delete(url, { headers: headers }).pipe(
      tap(() => {
        this.updateCart();
      })
    );
  }

  clearCart(userId: string): Observable<any> {
    const url = `${this.url}/cart/remove/${userId}`;
    const headers = this.authService.getHeaders();
    return this.http.delete(url, { headers: headers }).pipe(
      tap(() => {
        this.updateCart();
      })
    );
  }

  getCartState(): any {
    return this.cartSubject.getValue();
  }

  private updateCart() {
    this.getCart().subscribe();
  }

  openCart() {
    this.isCartOpenSubject.next(true);
  }

  closeCart() {
    this.isCartOpenSubject.next(false);
  }
}
