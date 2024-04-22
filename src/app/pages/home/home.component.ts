import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products!: any[];
  featuredProducts!: any[];
  showDropdown: boolean = false;

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
    this.productService.getFeaturedProducts().subscribe(
      (data: any[]) => {
        this.featuredProducts = data;
      },
      (error) => {
        console.error('Error al obtener productos destacados:', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

  getUsername(): string {
    return this.authService.getUsername();
  }

  logOut() {
    this.authService.logOut();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}
