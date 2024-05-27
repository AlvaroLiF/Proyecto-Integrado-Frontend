import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  products!: any[];
  categoryName: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    
    const categoryName = this.route.snapshot.paramMap.get('categoryName');
    this.categoryName = categoryName ? categoryName : ''; // Verificación para evitar null
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.categoryName) {
      this.productService.getProductsByCategory(this.categoryName).subscribe(
        data => {
          this.products = data;
        },
        error => {
          console.error('Error al obtener los productos:', error);
        }
      );
    } else {
      console.error('Nombre de categoría no proporcionado');
    }
  }
}
