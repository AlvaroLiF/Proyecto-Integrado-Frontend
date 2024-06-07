import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-address-modal',
  templateUrl: './shipping-address-modal.component.html',
  styleUrls: ['./shipping-address-modal.component.css']
})
export class ShippingAddressModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveAddressEvent = new EventEmitter<any>();
  @Input() shippingAddressForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }

  closeModal(): void {
    this.closeModalEvent.emit();
    this.shippingAddressForm.reset();
  }

  saveAddress(): void {
    if (this.shippingAddressForm.invalid) {
      return;
    }
    this.saveAddressEvent.emit(this.shippingAddressForm.value);
    this.shippingAddressForm.reset();
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
