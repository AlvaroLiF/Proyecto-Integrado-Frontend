import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-billing-address-modal',
  templateUrl: './billing-address-modal.component.html',
  styleUrls: ['./billing-address-modal.component.css']
})
export class BillingAddressModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveAddressEvent = new EventEmitter<any>();
  @Input() billingAddressForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  closeModal(): void {
    this.closeModalEvent.emit();
    this.billingAddressForm.reset();
  }

  saveAddress(): void {
    if (this.billingAddressForm.invalid) {
      return;
    }
    this.saveAddressEvent.emit(this.billingAddressForm.value);
    this.billingAddressForm.reset();
  }

  limitMobileInput(): void {
    const mobileControl = this.billingAddressForm.get('mobile');
    if (mobileControl && mobileControl.value.length > 9) {
      mobileControl.setValue(mobileControl.value.slice(0, 9));
    }
  }

  limitPostalCodeInput(): void {
    const postalCodeControl = this.billingAddressForm.get('postalCode');
    if (postalCodeControl && postalCodeControl.value.length > 5) {
      postalCodeControl.setValue(postalCodeControl.value.slice(0, 5));
    }
  }
}
