import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productId: string | null | undefined;
  product: any;
  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  images: string[] = []; // Carga las imágenes del producto aquí
  currentIndex: number = 0;


  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    // Obtén el ID del producto de los parámetros de la URL
    this.productId = this.route.snapshot.paramMap.get('id');

    // Verifica si el ID no es nulo antes de llamar al servicio
    if (this.productId !== null) {
      // Llama al servicio para obtener los detalles del producto
      this.productService.getProductDetails(this.productId).subscribe(
        (data) => {
          this.product = data;
          // Cargar las imágenes del producto en la propiedad 'images'
          if (this.product.photos && this.product.photos.length > 0) {
            this.images = this.product.photos;
          }
        },
        (error) => {
          console.error('Error al obtener detalles del producto:', error);
        }
      );
    } else {
      console.error('ID del producto es nulo.');
    }
  }

  getSpecificationKeys(): string[] {
    const keys = Object.keys(this.product.specifications);
    return keys;
  }

  addToCart(productId: string, quantity: number): void {
    if (productId && quantity) {
      this.cartService.addToCart(productId, quantity).subscribe(
        (response) => {
          console.log('Producto añadido al carrito:', response);
          // Aquí puedes redirigir al usuario a la página del carrito o mostrar un mensaje de éxito
          this.cartService.openCart();
        },
        (error) => {
          console.error('Error al agregar producto al carrito:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      );

    }
  }

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}

