import { Component, HostListener } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  cart: any;
  distinctProductCount: number = 0;

  constructor(private cartService: CartService, private orderService:OrderService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(
      (data) => {
        this.cart = data;
        console.log(this.cart);
        this.calculateDistinctProductCount();
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


  calculateDistinctProductCount(): void {
    const uniqueProductIds = new Set<string>();
    this.cart.items.forEach((item: any) => {
      uniqueProductIds.add(item.product._id); // Agrega el ID del producto al conjunto
    });
    this.distinctProductCount = uniqueProductIds.size; // Obtiene la longitud del conjunto
  }

}

