import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cart: any;
  totalItemCount: number = 0;

  constructor(private cartService: CartService, private orderService: OrderService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(
      (data) => {
        this.cart = data;
        console.log(this.cart);
        this.calculateTotalItemCount();
      },
      (error) => {
        console.error('Error al obtener el carrito:', error);
      }
    );
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart().subscribe();
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe(
      () => {
        console.log("Producto eliminado del carrito.");
        this.calculateTotalItemCount(); // Actualiza la cantidad total de artículos
      },
      (error) => {
        console.error('Error al eliminar del carrito:', error);
      }
    );
  }

  createOrder(): void {
    this.orderService.createOrder().subscribe(
      () => {
        console.log("Pedido creado exitosamente.");
        // Aquí puedes redirigir al usuario a la página de confirmación del pedido
      },
      (error) => {
        console.error('Error al crear el pedido:', error);
      }
    );
  }

  clearCart(userId: string): void {
    this.cartService.clearCart(userId).subscribe(
      () => {
        console.log("Carrito vaciado.");
        this.totalItemCount = 0; // Resetea la cantidad total de artículos
      },
      (error) => {
        console.error('Error al vaciar el carrito:', error);
      }
    );
  }

  calculateTotalItemCount(): void {
    this.totalItemCount = this.cart.items.reduce((total: number, item: any) => total + item.quantity, 0);
  }

}
