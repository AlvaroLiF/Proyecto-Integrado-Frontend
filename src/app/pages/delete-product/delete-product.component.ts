import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {

  products!: any[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
        console.log(products);
      },
      error => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log('Producto eliminado exitosamente');
        this.getProducts(); // Actualiza la lista de productos después de eliminar
      },
      error => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }


}
