import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  order: any; // Variable para almacenar el pedido

  constructor( private orderService: OrderService) { }

  getOrderId(): string {
    return localStorage.getItem('orderId') || '';
  }

  ngOnInit(): void {
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
}
