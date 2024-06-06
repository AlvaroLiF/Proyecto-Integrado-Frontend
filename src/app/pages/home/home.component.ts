import { Component, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products!: any[];
  featuredProducts!: any[];
  slideIndex = 0;
  containerWidth = 0;
  currentPage = 1; // Página actual
  itemsPerPage = 12;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        this.updateContainerWidth(); // Actualizar el ancho del contenedor al cargar los productos
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
  loadProducts(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products']) {
      this.updateContainerWidth();
    }
  }

  updateContainerWidth() {
    setTimeout(() => {
      const container = document.querySelector('.carousel-container') as HTMLElement;
      this.containerWidth = container.offsetWidth;
      this.showSlide(this.slideIndex);
    }, 0);
  }

  showSlide(index: number) {
    const totalSlides = this.products.length - 3;

    if (index >= totalSlides) {
      this.slideIndex = 0; // Volver al principio si nos desplazamos más allá del último producto
    } else if (index < 0) {
      this.slideIndex = totalSlides - 1; // Ir al último producto si nos desplazamos antes del primero
    } else {
      this.slideIndex = index;
    }

    const slideWidth = this.containerWidth / 4; // Ancho de cada slide (en tu caso, dividido por 4)
    const newTransformValue = -slideWidth * this.slideIndex;
    const slideContainer = document.querySelector('.carousel-slide') as HTMLElement;
    slideContainer.style.transform = `translateX(${newTransformValue}px)`;
  }

  nextSlide() {
    this.showSlide(this.slideIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.slideIndex - 1);
  }

  getCurrentPageProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  // Función para ir a la página siguiente
  nextPage(): void {
    const totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  // Función para ir a la página anterior
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }
}
