import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  users!: any[];
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

  constructor(private productService: ProductService) { }

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
    // Procesar características y especificaciones
    const processedData = {
      ...this.productData,
      features: this.splitAndTrim(this.productData.features),
      specifications: this.splitAndTrim(this.productData.specifications),
      photos: this.splitAndTrim(this.productData.photos),
    };

    this.productService.createProduct(processedData)
      .subscribe(
        () => {
          console.log('Producto creado exitosamente');
          // Puedes realizar redirecciones o acciones adicionales aquí después de crear el producto
        },
        error => {
          console.error('Error al crear el producto:', error);
          // Puedes mostrar mensajes de error o realizar otras acciones aquí en caso de error
        }
      );
  }

  splitAndTrim(input: string): string[] {
    return input.split(',').map(item => item.trim()).filter(item => item !== '');
  }

}
