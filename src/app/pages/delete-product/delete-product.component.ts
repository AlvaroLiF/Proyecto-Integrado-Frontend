import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  products!: any[];

  constructor(private productService: ProductService, private snackBar: MatSnackBar) { }

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
        this.snackBar.open('Producto eliminado exitosamente', 'Cerrar', { duration: 3000 });
        this.getProducts(); // Actualiza la lista de productos después de eliminar
      },
      error => {
        console.error('Error al eliminar el producto:', error);
        this.snackBar.open('Error al eliminar el producto', 'Cerrar', { duration: 3000 });
      }
    );
  }
}
