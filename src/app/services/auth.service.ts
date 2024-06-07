import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) { }

  private url = 'http://localhost:3000';
  //private url = 'https://componentx.onrender.com';

  private pendingCartItem: { productId: string, quantity: number } | null = null;
  
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

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('orderId');
    location.reload();
  }

  logoutWithGoogle() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      localStorage.removeItem('orderId');
      location.reload();
    });
  }

  getCurrentUser() {
    return this.afAuth.authState;
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

  getUserProfile(userId: string): Observable<any> {
    const url = `${this.url}/user/profile/${userId}`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers: headers });
  }

  updateUserProfile(userId: string, data: any): Observable<any> {
    const url = `${this.url}/user/profile/${userId}`;
    const headers = this.getHeaders();
    return this.http.put(url, data, { headers: headers });
  }
  
  verifyPassword(userId: string, currentPasswordData: any): Observable<any> {
    const url = `${this.url}/user/profile/verify-password/${userId}`;
    const headers = this.getHeaders();
    return this.http.post(url, currentPasswordData, { headers: headers });
  }

  updateUserPassword(userId: string, updatedPasswordData: any): Observable<any> {
    const url = `${this.url}/user/profile/update-password/${userId}`;
    const headers = this.getHeaders();
    return this.http.put(url, updatedPasswordData, { headers: headers });
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    const url = `${this.url}/user/send-reset-password-email`;
    const headers = this.getHeaders();
    return this.http.post(url, { email }, { headers });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const url = `${this.url}/user/reset-password`;
    const headers = this.getHeaders();
    return this.http.post(url, { token, newPassword }, { headers });
  }

  setPendingCartItem(item: { productId: string, quantity: number }): void {
    this.pendingCartItem = item;
  }

  getPendingCartItem(): { productId: string, quantity: number } | null {
    return this.pendingCartItem;
  }

  clearPendingCartItem(): void {
    this.pendingCartItem = null;
  }

  sendUserDataToBackend(userData: any): Observable<any> {
    const url = `${this.url}/user/login-google`;
    const headers = this.getHeaders();
    return this.http.post(url, userData, { headers: headers });
  }

  getUserShippingAddresses(userId: string): Observable<any> {
    const url = `${this.url}/users/${userId}/shipping-addresses`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers: headers });
  }

  deleteUserShippingAddress(userId: string, addressId: string): Observable<any> {
    const url = `${this.url}/users/${userId}/shipping-addresses/${addressId}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers: headers });
  }

  getUserPaymentMethods(userId: string): Observable<any> {
    const url = `${this.url}/users/${userId}/payment-methods`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers: headers });
  }

  deleteUserPaymentMethod(userId: string, paymentMethodId: string): Observable<any> {
    const url = `${this.url}/users/${userId}/payment-methods/${paymentMethodId}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers: headers });
  }

  getUserBillingAddresses(userId: string): Observable<any> {
    const url = `${this.url}/users/${userId}/billing-addresses`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers: headers });
  }

  deleteUserBillingAddress(userId: string, addressId: string): Observable<any> {
    const url = `${this.url}/users/${userId}/billing-addresses/${addressId}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers: headers });
  }

}
