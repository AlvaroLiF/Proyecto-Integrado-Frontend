import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  categories!: any[];
  products!: any[];
  mode: 'add' | 'edit' | 'delete' = 'add'; // Default to add mode

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

  addProduct(): void {
    const processedData = this.processData(this.productData);
    this.productService.createProduct(processedData).subscribe(
      () => {
        console.log('Producto creado exitosamente');
        this.snackBar.open('Producto creado exitosamente', 'Cerrar', { duration: 3000 });
        this.getProducts();
        this.resetForm();
      },
      error => {
        console.error('Error al crear el producto:', error);
        this.snackBar.open('Error al crear el producto', 'Cerrar', { duration: 3000 });
      }
    );
  }

  editProduct(product: any): void {
    this.productData = { 
      ...product,
      features: product.features.join(', '),
      specifications: product.specifications.join(', '),
      photos: product.photos.join(', ')
    };
    this.mode = 'edit';
  }

  updateProduct(): void {
    const processedData = this.processData(this.productData);
    this.productService.updateProduct(this.productData._id, processedData).subscribe(
      () => {
        console.log('Producto actualizado exitosamente');
        this.snackBar.open('Producto actualizado exitosamente', 'Cerrar', { duration: 3000 });
        this.getProducts();
        this.resetForm();
        this.mode = 'edit';
      },
      error => {
        console.error('Error al actualizar el producto:', error);
        this.snackBar.open('Error al actualizar el producto', 'Cerrar', { duration: 3000 });
      }
    );
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log('Producto eliminado exitosamente');
        this.snackBar.open('Producto eliminado exitosamente', 'Cerrar', { duration: 3000 });
        this.getProducts();
      },
      error => {
        console.error('Error al eliminar el producto:', error);
        this.snackBar.open('Error al eliminar el producto', 'Cerrar', { duration: 3000 });
      }
    );
  }

  processData(data: any): any {
    return {
      ...data,
      features: this.splitAndTrim(data.features),
      specifications: this.splitAndTrim(data.specifications),
      photos: this.splitAndTrim(data.photos),
    };
  }

  splitAndTrim(input: string): string[] {
    return input.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  resetForm(): void {
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
    this.mode = 'add';
  }

  setMode(mode: 'add' | 'edit' | 'delete'): void {
    this.mode = mode;
  }
}
