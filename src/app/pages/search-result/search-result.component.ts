import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchTerm!: string;
  searchResults!: any[]; // Define el tipo correcto para tus productos

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'];
      this.searchProducts(this.searchTerm);
    });
  }

  searchProducts(term: string): void {
    // Lógica para buscar productos en función del término de búsqueda
    // Utiliza el servicio ProductService para buscar productos
    this.productService.searchProducts(term).subscribe(results => {
      this.searchResults = results;
    });
  }
}
