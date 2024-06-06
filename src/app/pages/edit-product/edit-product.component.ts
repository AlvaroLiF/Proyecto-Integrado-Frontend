import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  categories!: any[];
  products!: any[];

  productData = {
    _id: '',
    name: '',
    price: 0,
    description: '',
    features: '',
    specifications: '',
    photos: '',
    category: '',
    featured: false
  };

  constructor(private productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories(): void {
    this.productService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        console.log(categories);
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );
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

  editProduct(product: any): void {
    // Copiar los datos del producto para editarlos
    this.productData = { 
      ...product,
      features: product.features.join(', '),
      specifications: product.specifications.join(', '),
      photos: product.photos.join(', ')
    }; 
  }

  updateProduct(): void {
    // Procesar características y especificaciones antes de enviar
    const processedData = {
      ...this.productData,
      features: this.splitAndTrim(this.productData.features),
      specifications: this.splitAndTrim(this.productData.specifications),
      photos: this.splitAndTrim(this.productData.photos),
    };

    this.productService.updateProduct(this.productData._id, processedData).subscribe(
      (updatedProduct) => {
        console.log('Producto actualizado exitosamente', updatedProduct);
        this.snackBar.open('Producto actualizado exitosamente', 'Cerrar', { duration: 3000 });
        this.getProducts(); // Actualiza la lista de productos después de editar
        this.resetForm();
      },
      error => {
        console.error('Error al actualizar el producto:', error);
        this.snackBar.open('Error al actualizar el producto', 'Cerrar', { duration: 3000 });
      }
    );
  }

  splitAndTrim(input: string): string[] {
    return input.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  resetForm() {
    this.productData = {
      _id: '',
      name: '',
      price: 0,
      description: '',
      features: '',
      specifications: '',
      photos: '',
      category: '',
      featured: false
    };
  }
}
