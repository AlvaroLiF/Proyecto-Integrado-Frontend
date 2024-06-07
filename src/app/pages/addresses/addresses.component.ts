import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  cart: any;
  shippingAddressForm: FormGroup;
  shippingAddresses: any[] = [];
  billingAddresses: any[] = [];
  billingAddressForm: FormGroup;
  showShippingModal: boolean = false;
  showBillingModal: boolean = false;
  editingShippingAddressId: string | null = null;
  editingBillingAddressId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService
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
      isDefault: [false]
    });

    this.billingAddressForm = this.fb.group({
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
      isDefault: [false]
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
    this.loadShippingAddresses();
    this.loadBillingAddresses();
  }

  getCart(): void {
    this.cartService.getCart().subscribe();
  }

  openShippingModal(isEditing: boolean, address?: any): void {
    this.showShippingModal = true;
    if (isEditing && address) {
      this.editingShippingAddressId = address._id;
      this.shippingAddressForm.patchValue(address);
    } else {
      this.editingShippingAddressId = null;
      this.shippingAddressForm.reset();
    }
  }

  openBillingModal(isEditing: boolean, address?: any): void {
    this.showBillingModal = true;
    if (isEditing && address) {
      this.editingBillingAddressId = address._id;
      this.billingAddressForm.patchValue(address);
    } else {
      this.editingBillingAddressId = null;
      this.billingAddressForm.reset();
    }
  }

  closeModal(): void {
    this.showShippingModal = false;
    this.showBillingModal = false;
    this.shippingAddressForm.reset();
    this.billingAddressForm.reset();
  }

  saveShipAddress(address: any): void {
    if (this.editingShippingAddressId) {
      this.updateShippingAddress(address);
    } else {
      this.saveShippingAddress(address);
    }
  }

  saveBillAddress(address: any): void {
    if (this.editingBillingAddressId) {
      this.updateBillingAddress(address);
    } else {
      this.saveBillingAddress(address);
    }
  }

  saveShippingAddress(address: any): void {
    this.orderService.createShippingAddress(address, this.authService.getUserId()).subscribe(
      (response) => {
        console.log('Dirección de envío creada:', response);
        this.loadShippingAddresses();
        this.closeModal();
      },
      (error) => {
        console.error('Error al crear la dirección de envío:', error);
      }
    );
  }

  updateShippingAddress(address: any): void {
    this.orderService.updateShippingAddress(this.editingShippingAddressId!, this.authService.getUserId(), address).subscribe(
      (response) => {
        console.log('Dirección de envío actualizada:', response);
        this.loadShippingAddresses();
        this.closeModal();
      },
      (error) => {
        console.error('Error al actualizar la dirección de envío:', error);
      }
    );
  }

  saveBillingAddress(address: any): void {
    this.orderService.createBillingAddress(address, this.authService.getUserId()).subscribe(
      (response) => {
        console.log('Dirección de facturación creada:', response);
        this.loadBillingAddresses();
        this.closeModal();
      },
      (error) => {
        console.error('Error al crear la dirección de facturación:', error);
      }
    );
  }

  updateBillingAddress(address: any): void {
    this.orderService.updateBillingAddress(this.editingBillingAddressId!, this.authService.getUserId(), address).subscribe(
      (response) => {
        console.log('Dirección de facturación actualizada:', response);
        this.loadBillingAddresses();
        this.closeModal();
      },
      (error) => {
        console.error('Error al actualizar la dirección de facturación:', error);
      }
    );
  }

  editShippingAddress(address: any): void {
    this.openShippingModal(true, address);
  }

  editBillingAddress(address: any): void {
    this.openBillingModal(true, address);
  }

  deleteShippingAddress(address: any): void {
    this.authService.deleteUserShippingAddress(this.authService.getUserId(), address._id).subscribe(
      (response) => {
        console.log('Dirección de envío eliminada:', response);
        this.loadShippingAddresses();
        this.closeModal();
      },
      (error) => {
        console.error('Error al eliminar la dirección de envío:', error);
      }
    );
  }

  deleteBillingAddress(address: any): void {
    this.authService.deleteUserBillingAddress(this.authService.getUserId(), address._id).subscribe(
      (response) => {
        console.log('Dirección de facturación eliminada:', response);
        this.loadBillingAddresses();
        this.closeModal();
      },
      (error) => {
        console.error('Error al eliminar la dirección de facturación:', error);
      }
    );
  }

  loadShippingAddresses(): void {
    this.authService.getUserShippingAddresses(this.authService.getUserId()).subscribe(
      (addresses) => {
        this.shippingAddresses = addresses;
        this.sortShippingAddresses(); // Llama a la función de ordenamiento después de cargar las direcciones
      },
      (error) => {
        console.error('Error al cargar las direcciones de envío:', error);
      }
    );
  }

  loadBillingAddresses(): void {
    this.authService.getUserBillingAddresses(this.authService.getUserId()).subscribe(
      (addresses) => {
        this.billingAddresses = addresses;
        this.sortBillingAddresses(); // Llama a la función de ordenamiento después de cargar las direcciones
      },
      (error) => {
        console.error('Error al cargar las direcciones de facturación:', error);
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

  sortShippingAddresses(): void {
    this.shippingAddresses.sort((a, b) => {
      // Si 'a' es predeterminada y 'b' no lo es, 'a' debe estar antes en la lista
      if (a.isDefault && !b.isDefault) {
        return -1;
      }
      // Si 'b' es predeterminada y 'a' no lo es, 'b' debe estar antes en la lista
      else if (!a.isDefault && b.isDefault) {
        return 1;
      }
      // En cualquier otro caso, mantiene el orden actual
      else {
        return 0;
      }
    });
}

sortBillingAddresses(): void {
  this.billingAddresses.sort((a, b) => {
    // Si 'a' es predeterminada y 'b' no lo es, 'a' debe estar antes en la lista
    if (a.isDefault && !b.isDefault) {
      return -1;
    }
    // Si 'b' es predeterminada y 'a' no lo es, 'b' debe estar antes en la lista
    else if (!a.isDefault && b.isDefault) {
      return 1;
    }
    // En cualquier otro caso, mantiene el orden actual
    else {
      return 0;
    }
  });
}

}