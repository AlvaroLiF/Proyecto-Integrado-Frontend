import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  shippingAddress: any = {
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    state: '',
    additionalInfo:'',
  };

  constructor(private router:Router){}

  submitShippingAddress(): void {
        this.router.navigate(['cart/payment']);
        console.error('Error al guardar la dirección de envío:');
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    
  }


