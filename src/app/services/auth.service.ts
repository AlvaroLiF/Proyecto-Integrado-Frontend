import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private url = 'https://componentx.onrender.com';
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  register(username: string, password: string, email: string): Observable<any> {
    const url = `${this.url}/user/register`;
    const headers = this.getHeaders();
    const body = { username, password, email };
    return this.http.post(url, body, { headers: headers });
  }

}
