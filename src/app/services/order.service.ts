import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private cartService: CartService, private authService: AuthService) { }

  //private url = 'http://localhost:3000';
  private url = 'https://componentx.onrender.com';

  createOrder(): Observable<any> {
    const userId = localStorage.getItem('userId');
    const url = `${this.url}/newOrder`;
    const headers = this.authService.getHeaders();
    const body = { userId, cart: this.cartService.getCartState() }; // Obtén el estado actual del carrito
    return this.http.post(url, body, { headers: headers }).pipe(
      tap((order: any) => {
        localStorage.setItem('orderId', order._id);
        console.log(order._id);
      })
    );
  }

  //CUANDO SE TERMINE EL PEDIDO, ELIMINAR EL ORDERID DEL LOCALSTORAGE


  createShippingAddress(shippingAddress: any, orderId: string): Observable<any> {
    const url = `${this.url}/newShipping`; // Ruta para crear la dirección de envío en el backend
    const headers = this.authService.getHeaders();
    const body = { ...shippingAddress, orderId }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.post(url, body, { headers: headers });
  }

  createPaymentMethod(paymentMethod: any, orderId: string): Observable<any> {
    const url = `${this.url}/newPayment`; // Ruta para crear la dirección de envío en el backend
    const headers = this.authService.getHeaders();
    const body = { ...paymentMethod, orderId }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.post(url, body, { headers: headers });
  }

  getOrderById(orderId: string): Observable<any> {
    const url = `${this.url}/orders/${orderId}`; // URL para obtener un pedido por su ID
    const headers = this.authService.getHeaders();
    return this.http.get(url, { headers: headers });
  }

  deleteOrderById(orderId: string): Observable<any> {
    const url = `${this.url}/orders/${orderId}`; // URL para obtener un pedido por su ID
    const headers = this.authService.getHeaders();
    return this.http.delete(url, { headers: headers });
  }

  getOrdersByUserId(userId: string): Observable<any> {
    const url = `${this.url}/user/${userId}`;
    const headers = this.authService.getHeaders();
    return this.http.get(url, { headers: headers });
  }


}
