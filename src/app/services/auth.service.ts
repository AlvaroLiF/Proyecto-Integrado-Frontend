import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000';
  //private url = 'https://componentx.onrender.com';
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  login(username: string, password: string): Observable<any> {

    let body = {};

    if (username.includes('@')) {
      body = { email: username, password: password };
    } else {
      body = { username: username, password: password };
    }
    const url = `${this.url}/user/login`;
    const headers = this.getHeaders();
    return this.http.post(url, body, { headers: headers });
  }

  register(username: string, password: string, email: string): Observable<any> {
    const url = `${this.url}/user/register`;
    const headers = this.getHeaders();
    const body = { username, password, email };
    return this.http.post(url, body, { headers: headers });
  }

  getUsername(): string {
    return localStorage.getItem('userName') || '';
  }

  getUserId(): string {
    return localStorage.getItem('userID') || '';
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  }

  isAdmin(): boolean {
    const userRoles = localStorage.getItem('userRole');
    return !!userRoles && userRoles.includes('ROLE_ADMIN');
  }

  getToken():string {
    return localStorage.getItem('token') || '';
  }

  getUsers(): Observable<any> {
    const url = `${this.url}/users`;
    const headers = this.getHeaders();
    return this.http.get(url, {headers:headers});
  }

}
