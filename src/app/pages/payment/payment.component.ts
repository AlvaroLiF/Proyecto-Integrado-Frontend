import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cart: any;
  paymentMethodForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService
  ) {
    this.paymentMethodForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$')]], // MM/YY format
      securityCode: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      cardholderName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cartService.cart$.subscribe(
      (data) => {
        this.cart = data;
        console.log(this.cart);
      },
      (error) => {
        console.error('Error al obtener el carrito:', error);
      }
    );
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart().subscribe();
  }

  getOrderId(): string {
    return localStorage.getItem('orderId') || '';
  }

  createPaymentMethod(): void {
    if (this.paymentMethodForm.invalid) {
      return; // Si el formulario no es válido, no proceder
    }

    this.orderService.createPaymentMethod(this.paymentMethodForm.value, this.getOrderId()).subscribe(
      (response) => {
        console.log('Método de pago creado:', response);
        this.router.navigate(['order/resume']);
      },
      (error) => {
        console.error('Error al crear el método de pago:', error);
      }
    );
  }
}
