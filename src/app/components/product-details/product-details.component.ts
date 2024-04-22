import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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


  constructor(private route: ActivatedRoute, private productService: ProductService, private router:Router) {}

  ngOnInit(): void {
    // Obtén el ID del producto de los parámetros de la URL
    this.productId = this.route.snapshot.paramMap.get('id');

    // Verifica si el ID no es nulo antes de llamar al servicio
    if (this.productId !== null) {
      // Llama al servicio para obtener los detalles del producto
      this.productService.getProductDetails(this.productId).subscribe(
        (data) => {
          this.product = data;
        },
        (error) => {
          console.error('Error al obtener detalles del producto:', error);
        }
      );
    } else {
      console.error('ID del producto es nulo.');
    }
  }

  addToCart(product: any, quantity: number) {
    // Aquí podrías realizar acciones adicionales antes de redirigir, si es necesario

    // Redirige a la página de compra y pasa los parámetros necesarios
    this.router.navigate(['/checkout'], {
      queryParams: { productId: product._id, quantity },
    });
  }

  getSpecificationKeys(): string[] {
    const keys = Object.keys(this.product.specifications);
    return keys;
  }

}
