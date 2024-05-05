import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  users!: any[];
  categories!: any[]; // Suponiendo que cada categoría tiene un id y un nombre
  specificationsData: { [key: string]: { [key: string]: string } } = {};
  specificationKey: string = '';
  specificationValueKey: string = '';
  specificationValueValue: string = '';

  productData = {
    name: '',
    price: 0,
    description: '',
    features: '',
    specifications:{},
    photos: '',
    category: '',
    featured: false
  };


  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getUsers();
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
    console.log(this.productData);
    this.productData.specifications = this.specificationsData;

    this.productService.createProduct(this.productData)
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

  addSpecification() {
    console.log('specificationKey:', this.specificationKey);
    console.log('specificationValue:', this.specificationValueKey);
    if (this.specificationKey && this.specificationValueKey) {
      if (!this.specificationsData[this.specificationKey]) {
        this.specificationsData[this.specificationKey] = {}; // Inicializa como objeto vacío si es undefined
      }
      this.specificationsData[this.specificationKey][this.specificationValueKey] = this.specificationValueValue; // Asigna un valor vacío para la clave interna
      // Limpiar los campos después de agregar la especificación
      this.specificationKey = '';
      this.specificationValueKey = '';
      this.specificationValueValue = '';
  
      console.log('Especificación agregada:', this.specificationsData);
    }
  }

  getUsers(): void {
    this.authService.getUsers().subscribe(
      users => {
        this.users = users;
        console.log(users);
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }
  
}
