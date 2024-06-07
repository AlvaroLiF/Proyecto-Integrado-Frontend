import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  cart: any;
  shippingAddressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService
  ) {
    this.shippingAddressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      additionalInfo: [''],
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

  createShippingAddress(): void {
    if (this.shippingAddressForm.invalid) {
      return;
    }

    this.orderService.createShippingAddress(this.shippingAddressForm.value, this.getOrderId()).subscribe(
      (response) => {
        console.log('Dirección de envío creada:', response);
        this.router.navigate(['order/payment']);
      },
      (error) => {
        console.error('Error al crear la dirección de envío:', error);
      }
    );
  }

  limitMobileInput(): void {
    const mobileControl = this.shippingAddressForm.get('mobile');
    if (mobileControl && mobileControl.value.length > 9) {
      mobileControl.setValue(mobileControl.value.slice(0, 9));
    }
  }

  limitPostalCodeInput(): void {
    const postalCodeControl = this.shippingAddressForm.get('postalCode');
    if (postalCodeControl && postalCodeControl.value.length > 5) {
      postalCodeControl.setValue(postalCodeControl.value.slice(0, 5));
    }
  }
}
