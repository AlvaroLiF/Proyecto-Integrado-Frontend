import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm!: string;

  constructor(private router: Router) { }

  search(): void {
    if (this.searchTerm) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    }
  }
}
