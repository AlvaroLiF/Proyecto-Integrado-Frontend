import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true; // El usuario está loggeado, permitir acceso
    } else {
      this.router.navigate(['/home']); // Redirigir a la página de login si no está loggeado
      return false;
    }
  }
}
