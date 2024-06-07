import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories!: any[]; // Suponiendo que cada categoría tiene un id y un nombre

  productData = {
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

  onSubmit() {
    const processedData = {
      ...this.productData,
      features: this.splitAndTrim(this.productData.features),
      specifications: this.splitAndTrim(this.productData.specifications),
      photos: this.splitAndTrim(this.productData.photos),
    };

    this.productService.createProduct(processedData).subscribe(
      () => {
        console.log('Producto creado exitosamente');
        this.snackBar.open('Producto creado exitosamente', 'Cerrar', { duration: 3000 });
        this.resetForm();
      },
      error => {
        console.error('Error al crear el producto:', error);
        this.snackBar.open('Error al crear el producto', 'Cerrar', { duration: 3000 });
      }
    );
  }

  splitAndTrim(input: string): string[] {
    return input.split(',').map(item => item.trim()).filter(item => item !== '');
  }

  resetForm() {
    this.productData = {
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
