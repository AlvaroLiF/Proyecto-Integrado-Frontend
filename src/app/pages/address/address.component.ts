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
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      postalCode: ['', Validators.required],
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
      return; // Si el formulario no es válido, no proceder
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
}
