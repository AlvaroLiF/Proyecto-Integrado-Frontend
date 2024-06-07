import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: string | null | undefined;
  product: any;
  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  images: string[] = [];
  currentIndex: number = 0;
  private defaultImage = 'assets/images/1934-pccom-ready-amd-ryzen-7-5800x-32gb-1tb-ssd-rtx-4060-ti-comprar.webp'; // Ruta a la imagen predeterminada

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
  
    if (this.productId !== null) {
      this.productService.getProductDetails(this.productId).subscribe(
        (data) => {
          this.product = data;
          if (this.product.photos && this.product.photos.length > 0) {
            this.images = this.product.photos;
          } else {
            // Si no hay fotos, establecer la imagen predeterminada
            this.images = [this.defaultImage];
          }
        },
        (error) => {
          console.error('Error al obtener detalles del producto:', error);
          // Si hay un error, establecer la imagen predeterminada
          this.images = [this.defaultImage];
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
        if (this.authService.isLoggedIn()) {
            this.cartService.addToCart(productId, quantity).subscribe(
                (response) => {
                    console.log('Producto añadido al carrito:', response);
                    this.cartService.openCart();
                },
                (error) => {
                    console.error('Error al agregar producto al carrito:', error);
                }
            );
        } else {
          this.authService.setPendingCartItem({ productId, quantity });
          this.router.navigate(['/signin']);
        }
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

  isArray(specifications: any): boolean {
    return Array.isArray(specifications);
  }

  isObject(specifications: any): boolean {
    return typeof specifications === 'object' && !Array.isArray(specifications);
  }
}
