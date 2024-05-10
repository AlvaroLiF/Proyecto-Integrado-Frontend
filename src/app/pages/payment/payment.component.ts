import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  paymentMethod: any = {
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    cardholderName: '',
  };

  constructor(private router: Router, private orderService: OrderService) { }

  getOrderId(): string {
    return localStorage.getItem('orderId') || '';
  }

  submitPaymentMethod(): void {
    console.log(localStorage.getItem('orderId'));
    this.orderService.createPaymentMethod(this.paymentMethod, this.getOrderId()).subscribe(
      (response) => {
        // Manejar la respuesta del backend, si es necesario
        console.log('Método de pago creado:', response);
        // Redirigir al siguiente paso, por ejemplo, la página de pago
        this.router.navigate(['order/resume']);
      },
      (error) => {
        console.error('Error al crear el método de pago:', error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      }
    );
  }


}


