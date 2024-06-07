import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shipping-address-card',
  templateUrl: './shipping-address-card.component.html',
  styleUrls: ['./shipping-address-card.component.css']
})
export class ShippingAddressCardComponent {
  @Input() address: any;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() select = new EventEmitter<any>();
  @Input() isSelected: boolean = false; // Nuevo input para indicar si está seleccionada
  @Input() showSelectButton: boolean = true;

  editAddress(): void {
    this.edit.emit();
  }

  deleteAddress(): void {
    this.delete.emit();
  }

  selectAddress() {
    this.select.emit(this.address);
  }

  formatAddress(address: any): string {
    return `${address.addressLine1}, ${address.addressLine2 ? address.addressLine2 + ', ' : ''}${address.postalCode}, ${address.city}, ${address.state}, ${address.country}`;
  }
}
