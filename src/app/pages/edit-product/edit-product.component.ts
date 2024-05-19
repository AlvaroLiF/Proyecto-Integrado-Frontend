import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  categories!: any[];
  products!: any[];
  specificationKey: string = '';
  specificationValueKey: string = '';
  specificationValueValue: string = '';

  productData = {
    _id:'',
    name: '',
    price: 0,
    description: '',
    features: '',
    specifications: {},
    photos: '',
    category: '',
    featured: false
  };


  constructor(private productService: ProductService) { }

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
    this.productData = { ...product }; // Copiar los datos del producto para editarlos
  }

  updateProduct(): void {
    this.productService.updateProduct(this.productData._id, this.productData).subscribe(
      (updatedProduct) => {
        console.log('Producto actualizado exitosamente', updatedProduct);
        this.getProducts(); // Actualiza la lista de productos después de editar
      },
      error => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

}
