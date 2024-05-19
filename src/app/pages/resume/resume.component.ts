import { Component, HostListener } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  order: any = {}; // Variable para almacenar el pedido

  constructor(private orderService: OrderService, private cartService:CartService) { }

  getOrderId(): string {
    return localStorage.getItem('orderId') || '';
  }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  ngOnInit(): void {
    this.cartService.clearCart(this.getUserId()).subscribe(
      () => {
        console.log('Carrito vaciado con éxito');
      },
      (error) => {
        console.error('Error al vaciar el carrito:', error);
      }
    );
    // Obtener el ID del pedido de los parámetros de la ruta
    // Llamar al método del servicio de pedido para obtener el pedido por su ID
    this.orderService.getOrderById(this.getOrderId()).subscribe(
      (data: any) => {
        // Al recibir la respuesta, asignar el pedido a la variable correspondiente
        this.order = data;
      },
      (error: any) => {
        console.error(error); // Manejar cualquier error
      }
    );
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    localStorage.removeItem('orderId');
  }

  clearCart(userId: string): void {
    this.cartService.clearCart(userId).subscribe(
      () => {
        console.log("Carrito vaciado.");
      },
      (error) => {
        console.error('Error al vaciar el carrito:', error);
      }
    );
  }


}

