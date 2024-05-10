import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  shippingAddress: any = {
    firstName:'',
      lastName:'',
      country:'',
      mobile:'',
      addressLine1:'',
      addressLine2:'',
      postalCode:'',
      city:'',
      state:'',
      additionalInfo:'',
  };

  constructor(private router:Router, private orderService:OrderService){}

  getOrderId():string{
    return localStorage.getItem('orderId') || '';
  }

  submitShippingAddress(): void {
    console.log(localStorage.getItem('orderId'));
    this.orderService.createShippingAddress(this.shippingAddress, this.getOrderId()).subscribe(
      (response) => {
        // Manejar la respuesta del backend, si es necesario
        console.log('Dirección de envío creada:', response);
        // Redirigir al siguiente paso, por ejemplo, la página de pago
        this.router.navigate(['order/payment']);
      },
      (error) => {
        console.error('Error al crear la dirección de envío:', error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      }
    );
  }
  
    
  }


