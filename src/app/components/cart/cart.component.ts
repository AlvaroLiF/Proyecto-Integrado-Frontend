import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: any;
  showCartDropdown: boolean = false;
  distinctProductCount: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

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
    this.cartService.isCartOpen$.subscribe(
      (isOpen) => {
        this.showCartDropdown = isOpen;
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

  goToHomePage() {
    if (this.router.url === '/home') {
      window.location.reload(); // Recargar la página si ya estamos en la página de inicio
    } else {
      this.router.navigateByUrl('/home'); // Navegar a la página de inicio si estamos en otra página
    }
  }

  toggleCartDropdown() {
    this.showCartDropdown = !this.showCartDropdown;
  }

  calculateDistinctProductCount(): void {
    const uniqueProductIds = new Set<string>();
    this.cart.items.forEach((item: any) => {
      uniqueProductIds.add(item.product._id); // Agrega el ID del producto al conjunto
    });
    this.distinctProductCount = uniqueProductIds.size; // Obtiene la longitud del conjunto
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Verifica si el clic se produjo fuera del menú desplegable
    const target = event.target as HTMLElement;
    const cartContainer = document.querySelector('.cart-container') as HTMLElement;
    if (!cartContainer.contains(target)) {
      // Cierra el menú desplegable si está abierto
      this.showCartDropdown = false;
    }
  }
}
