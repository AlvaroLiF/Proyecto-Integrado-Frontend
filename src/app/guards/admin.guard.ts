import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAdmin()) {
      return true; // El usuario es admin, permitir acceso
    } else {
      this.router.navigate(['/']); // Redirigir a otra página si no es admin
      return false;
    }
  }
}
