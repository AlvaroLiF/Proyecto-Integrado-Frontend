import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
      expirationDate: ['', [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$'), // MM/YY format
        this.validateExpirationDate.bind(this) // Custom validator
      ]],
      securityCode: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
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

    // Validar fecha de expiración
    const expirationDateControl = this.paymentMethodForm.get('expirationDate');
    if (!expirationDateControl) {
      console.error('El control de fecha de expiración no está definido.');
      return;
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

  // Validador personalizado para la fecha de expiración
  validateExpirationDate(control: FormControl): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
  
    if (!control.value) {
      return { 'required': true };
    }
  
    const parts = control.value.split('/');
    if (parts.length !== 2) {
      return { 'invalidFormat': true };
    }
  
    const month = parseInt(parts[0], 10);
    let year = parseInt(parts[1], 10);
  
    if (isNaN(month) || isNaN(year)) {
      return { 'invalidFormat': true };
    }
  
    // Ajustar el año para que esté en el rango correcto
    if (year < 100) {
      year += Math.floor(currentYear / 100) * 100; // Convertir el año de dos dígitos a cuatro dígitos
      if (year > currentYear + 10) {
        year -= 100; // Si el año es más de 10 años en el futuro, resta 100 para ajustarlo al siglo actual
      }
    }
  
    if (year < currentYear || (year == currentYear && month < currentMonth)) {
      return { 'invalidExpirationDate': true };
    }
  
    return null;
  }
  
  

  limitCardNumberInput(): void {
    const cardNumberControl = this.paymentMethodForm.get('cardNumber');
    if (cardNumberControl && cardNumberControl.value.length > 16) {
      cardNumberControl.setValue(cardNumberControl.value.slice(0, 16));
    }
  }

  limitSecurityCodeInput(): void {
    const securityCodeControl = this.paymentMethodForm.get('securityCode');
    if (securityCodeControl && securityCodeControl.value.length > 3) {
      securityCodeControl.setValue(securityCodeControl.value.slice(0, 3));
    }
  }
}
