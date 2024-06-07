import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cart: any;
  paymentMethodForm: FormGroup;
  paymentMethods: any[] = [];
  showModal: boolean = false;
  isEditing: boolean = false;
  editingPaymentId: string | null = null;
  selectedPaymentMethod: any = null;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.paymentMethodForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationDate: ['', [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$') // MM/YY format
      ]],
      securityCode: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      cardholderName: ['', Validators.required],
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
    this.loadPaymentMethods();
  }

  getCart(): void {
    this.cartService.getCart().subscribe();
  }

  getOrderId(): string {
    return localStorage.getItem('orderId') || '';
  }

  loadPaymentMethods(): void {
    this.authService.getUserPaymentMethods(this.authService.getUserId()).subscribe(
      (methods) => {
        this.paymentMethods = methods;
        this.sortPaymentMethods(); // Ordena los métodos de pago
      },
      (error) => {
        console.error('Error al cargar los métodos de pago:', error);
      }
    );
  }

  sortPaymentMethods(): void {
    this.paymentMethods.sort((a, b) => {
      if (a.isDefault && !b.isDefault) {
        return -1;
      } else if (!a.isDefault && b.isDefault) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  openModal(isEditing: boolean, payment?: any): void {
    this.showModal = true;
    if (isEditing && payment) {
      this.editingPaymentId = payment._id;
      this.paymentMethodForm.patchValue(payment);
    } else {
      this.editingPaymentId = null;
      this.paymentMethodForm.reset();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.paymentMethodForm.reset();
  }

  editPaymentMethod(payment: any): void {
    this.openModal(true, payment);
  }


  savePaymentMethod(payment: any): void {
    if (this.editingPaymentId) {
      this.updatePaymentMethod(payment);
    } else {
      this.createPaymentMethod(payment);
    }
  }

  createPaymentMethod(payment: any): void {
    this.orderService.createPaymentMethod(payment, this.authService.getUserId()).subscribe(
      (response) => {
        console.log('Método de pago creado:', response);
        this.loadPaymentMethods();
        this.closeModal();
      },
      (error) => {
        console.error('Error al crear el método de pago:', error);
      }
    );
  }

  updatePaymentMethod(payment: any): void {
    this.orderService.updatePaymentMethod(this.editingPaymentId!, this.authService.getUserId(), payment).subscribe(
      (response) => {
        console.log('Método de pago actualizado:', response);
        this.loadPaymentMethods();
        this.closeModal();
      },
      (error) => {
        console.error('Error al actualizar el método de pago:', error);
      }
    );
  }

  deletePaymentMethod(payment: any): void {
    this.authService.deleteUserPaymentMethod(this.authService.getUserId(), payment._id).subscribe(
      (response) => {
        console.log('Método de pago eliminado:', response);
        this.loadPaymentMethods();
      },
      (error) => {
        console.error('Error al eliminar el método de pago:', error);
      }
    );
  }

  selectPaymentMethod(payment: any): void {
    this.selectedPaymentMethod = payment;
    this.updateSelectedMethod(); // Actualiza el estado de selección
  }

  updateSelectedMethod(): void {
    this.paymentMethods.forEach(payment => {
      payment.isSelected = (payment._id === this.selectedPaymentMethod._id);
    });
  }

  finalizeOrder(): void {
    if (this.selectedPaymentMethod) {
      const orderId = this.getOrderId(); // Implementa este método para obtener el ID del pedido actual
  
      this.orderService.assignPaymentMethod(orderId, this.selectedPaymentMethod._id).subscribe(
        (response) => {
          console.log('Método de pago asignado al pedido:', response);
          // Navega a la página de confirmación o resumen del pedido
          this.router.navigate(['order/resume']);
        },
        (error) => {
          console.error('Error al asignar el método de pago:', error);
        }
      );
    } else {
      alert('Por favor selecciona un método de pago.');
    }
  }
  

}
