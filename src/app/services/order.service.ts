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

  createShippingAddress(shippingAddress: any, userId: string): Observable<any> {
    const url = `${this.url}/shipping-addresses`; // Ruta para crear la dirección de envío en el backend
    const headers = this.authService.getHeaders();
    const body = { ...shippingAddress, userId }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.post(url, body, { headers: headers });
  }

  updateShippingAddress(addressId: string, userId: string, address: any): Observable<any> {
    const url = `${this.url}/shipping-address/${addressId}`;
    const headers = this.authService.getHeaders();
    const body = {userId, ...address   }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.put(url, body, { headers: headers });
  }

  assignShippingAddress(orderId: string, addressId: string): Observable<any> {
    const url = `${this.url}/assign-shipping-address-to-order`;
    const headers = this.authService.getHeaders();
    const body = {orderId, addressId   }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.put(url, body, { headers: headers });
  }

  createPaymentMethod(paymentMethod: any, userId: string): Observable<any> {
    const url = `${this.url}/payment-methods`; // Ruta para crear la dirección de envío en el backend
    const headers = this.authService.getHeaders();
    const body = { ...paymentMethod, userId }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.post(url, body, { headers: headers });
  }

  updatePaymentMethod(methodId: string, userId: string, payment: any): Observable<any> {
    const url = `${this.url}/payment-method/${methodId}`;
    const headers = this.authService.getHeaders();
    const body = {userId, ...payment   }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.put(url, body, { headers: headers });
  }

  assignPaymentMethod(orderId: string, paymentMethodId: string): Observable<any> {
    const url = `${this.url}/assign-payment-method`;
    const headers = this.authService.getHeaders();
    const body = {orderId, paymentMethodId   }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.put(url, body, { headers: headers });
  }

  createBillingAddress(shippingAddress: any, userId: string): Observable<any> {
    const url = `${this.url}/billing-addresses`; // Ruta para crear la dirección de envío en el backend
    const headers = this.authService.getHeaders();
    const body = { ...shippingAddress, userId }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.post(url, body, { headers: headers });
  }

  updateBillingAddress(addressId: string, userId: string, address: any): Observable<any> {
    const url = `${this.url}/billing-address/${addressId}`;
    const headers = this.authService.getHeaders();
    const body = {userId, ...address   }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.put(url, body, { headers: headers });
  }

  assignBillingAddress(orderId: string, addressId: string): Observable<any> {
    const url = `${this.url}/assign-billing-address-to-order`;
    const headers = this.authService.getHeaders();
    const body = {orderId, addressId   }; // Combina los datos de la dirección de envío con el ID del pedido
    return this.http.put(url, body, { headers: headers });
  }

  getOrderById(orderId: string): Observable<any> {
    const url = `${this.url}/orders/${orderId}`; // URL para obtener un pedido por su ID
    const headers = this.authService.getHeaders();
    return this.http.get(url, { headers: headers });
  }

  deleteOrderById(orderId: string): Observable<any> {
    const url = `${this.url}/user/orders/${orderId}`; // URL para obtener un pedido por su ID
    const headers = this.authService.getHeaders();
    return this.http.delete(url, { headers: headers });
  }

  getOrdersByUserId(userId: string): Observable<any> {
    const url = `${this.url}/user/${userId}`;
    const headers = this.authService.getHeaders();
    return this.http.get(url, { headers: headers });
  }

  confirmPaymentAndSendEmail(orderId: string): Observable<any> {
    const url = `${this.url}/orders/${orderId}/payment/confirm`; // URL para confirmar el pago y enviar el correo
    const headers = this.authService.getHeaders();
    const body = { orderId };
    return this.http.post(url, body, { headers: headers });
  }


}
