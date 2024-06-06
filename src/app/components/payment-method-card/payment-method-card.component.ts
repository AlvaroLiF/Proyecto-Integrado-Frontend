import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment-method-card',
  templateUrl: './payment-method-card.component.html',
  styleUrls: ['./payment-method-card.component.css']
})
export class PaymentMethodCardComponent {
  @Input() payment: any;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() select = new EventEmitter<any>();
  @Input() isSelected: boolean = false; // Nuevo input para indicar si está seleccionada



  editPaymentMethod(): void {
    this.edit.emit();
  }

  deletePaymentMethod(): void {
    this.delete.emit();
  }

  selectPaymentMethod() {
    this.select.emit(this.payment);
  }
}
