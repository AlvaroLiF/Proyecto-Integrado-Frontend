import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.productService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error al cargar categorías', error);
      }
    );
  }

  goToCategory(categoryName: string) {
    const categoryUrl = '/category/' + encodeURIComponent(categoryName);
    this.router.navigateByUrl(categoryUrl).then(() => {
      setTimeout(() => {
        window.location.href = categoryUrl;
      }, 100);
    });
  }
}
