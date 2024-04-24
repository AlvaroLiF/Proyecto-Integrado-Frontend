import { Component } from '@angular/core';
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
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart().subscribe(
      (data) => {
        this.cart = data;
        console.log(this.cart);
      },
      (error) => {
        console.error('Error al obtener el carrito:', error);
      }
    );
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe(
      () => {console.log("hola");
        // Actualiza la vista del carrito después de eliminar un producto
        this.getCart();
        
      },
      (error) => {
        console.error('Error al eliminar del carrito:', error);
      }
    );
  }

  toggleCartDropdown() {
    this.showCartDropdown = !this.showCartDropdown;
  }

}
