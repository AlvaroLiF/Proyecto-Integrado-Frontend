import { Component, HostListener } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: any;
  showCartDropdown: boolean = false;

  constructor(private cartService: CartService) { }

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

  toggleCartDropdown() {
    this.showCartDropdown = !this.showCartDropdown;
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
