import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products!: any[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  getFirstImage(photos: string[] | undefined): string {
    return photos && photos.length > 0 ? photos[0] : 'ruta_por_defecto.jpg';
  }


}
