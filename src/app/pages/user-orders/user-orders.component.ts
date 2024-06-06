import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {

  orders!: any[];

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    const userId = this.authService.getUserId();
    this.orderService.getOrdersByUserId(userId).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
        this.orders = [];
      }
    );
  }

  cancelOrder(orderId: string): void {
    this.orderService.deleteOrderById(orderId).subscribe(
      () => {
        this.getOrders(); // Recargar los pedidos después de cancelar uno
      },
      (error) => {
        console.error('Error al cancelar pedido:', error);
      }
    );
  }

}
