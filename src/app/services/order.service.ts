import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private cartService:CartService) { }

  private url = 'http://localhost:3000';
  //private url = 'https://componentx.onrender.com';
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  createOrder(): Observable<any> {
    const userId = localStorage.getItem('userId');
    const url = `${this.url}/newOrder`;
    const headers = this.getHeaders();
    const body = { userId, cart: this.cartService.getCartState() }; // Obtén el estado actual del carrito
    return this.http.post(url, body, { headers: headers }).pipe(
      tap((order: any) => {
        if (!localStorage.getItem('orderId')) {
          localStorage.setItem('orderId', order._id);
        console.log(order._id);
        }
      })
    );
  }

  //CUANDO SE TERMINE EL PEDIDO, ELIMINAR EL ORDERID DEL LOCALSTORAGE
  

  createShippingAddress(shippingAddress: any, orderId: string): Observable<any> {
    const url = `${this.url}/newShipping`; // Ruta para crear la dirección de envío en el backend
    const headers = this.getHeaders();
    const body = { ...shippingAddress, orderId }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.post(url, body, { headers: headers });
  }

  createPaymentMethod(paymentMethod: any, orderId: string): Observable<any> {
    const url = `${this.url}/newPayment`; // Ruta para crear la dirección de envío en el backend
    const headers = this.getHeaders();
    const body = { ...paymentMethod, orderId }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.post(url, body, { headers: headers });
  }

  getOrderById(orderId: string): Observable<any> {
    const url = `${this.url}/${orderId}`; // URL para obtener un pedido por su ID
    const headers = this.getHeaders();
    return this.http.get(url, {headers:headers});
  }
}
