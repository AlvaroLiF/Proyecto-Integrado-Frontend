import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-payment-method-modal',
  templateUrl: './payment-method-modal.component.html',
  styleUrls: ['./payment-method-modal.component.css']
})
export class PaymentMethodModalComponent {
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() savePaymentEvent = new EventEmitter<any>();
  @Input() paymentMethodForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentMethodForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationDate: ['', [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$'), // MM/YY format
        this.validateExpirationDate.bind(this) // Custom validator
      ]],
      securityCode: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      cardholderName: ['', Validators.required],
      isDefault: [false]
    });
  }

  closeModal(): void {
    this.closeModalEvent.emit();
    this.paymentMethodForm.reset();
  }

  savePaymentMethod(): void {
    if (this.paymentMethodForm.invalid) {
      return;
    }
    this.savePaymentEvent.emit(this.paymentMethodForm.value);
    this.paymentMethodForm.reset();
  }

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

    if (year < 100) {
      year += Math.floor(currentYear / 100) * 100;
      if (year > currentYear + 10) {
        year -= 100;
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
