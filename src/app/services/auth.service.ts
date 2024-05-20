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
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
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
    return localStorage.getItem('userId') || '';
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('orderId');

  }

  isAdmin(): boolean {
    const userRoles = localStorage.getItem('userRole');
    return !!userRoles && userRoles.includes('ROLE_ADMIN');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUsers(): Observable<any> {
    const url = `${this.url}/users`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers: headers });
  }

  addAdminRole(userId: string): Observable<any> {
    const url = `${this.url}/users/${userId}/addAdminRole`;
    const headers = this.getHeaders();
    return this.http.patch(url, { headers: headers });
  }

  removeAdminRole(userId: string): Observable<any> {
    const url = `${this.url}/users/${userId}/removeAdminRole`;
    const headers = this.getHeaders();
    return this.http.patch(url, { headers: headers });
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.url}/users/${userId}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers: headers });
  }

}
