import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  
  private url = 'http://localhost:3000';
  //private url = 'https://componentx.onrender.com';
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  getAllProducts(): Observable<any> {
    const url = `${this.url}/products`;
    const headers = this.getHeaders();
    return this.http.get(url, {headers:headers});
  }

  getFeaturedProducts(): Observable<any> {
    const url = `${this.url}/featured`;
    const headers = this.getHeaders();
    return this.http.get(url, {headers:headers});
  }

}
