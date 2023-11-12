import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  //private url = 'http://localhost:3000';
  private url = 'https://componentx.onrender.com';
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  login(username: string, password: string): Observable<any> {
    let body = {};

    // Si el valor proporcionado es un correo electrónico
    if (username.includes('@')) {
      body = { email: username, password: password };
    } else {
      // Si el valor proporcionado es un nombre de usuario
      body = { username: username, password: password };
    }
    const url = `${this.url}/user/login`;
    const headers = this.getHeaders();
    return this.http.post(url, body, {headers:headers});
  }

  register(username: string, password: string, email: string): Observable<any> {
    const url = `${this.url}/user/register`;
    const headers = this.getHeaders();
    const body = { username, password, email };
    return this.http.post(url, body, {headers:headers});
  }

}
