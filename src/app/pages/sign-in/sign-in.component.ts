import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service'; 
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string = ''; // Inicializar como cadena vacía
  showPassword = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService, // Inyectar el servicio del carrito
    private router: Router,
    private snackBar: MatSnackBar,
    private afAuth: AngularFireAuth,
    private http: HttpClient,
  ) {
    this.signInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessage = ''; // Reset error message before submission

    if (this.signInForm.valid) {
      const username = this.signInForm.controls['username'].value.replace(/\s+/g, '');
      const password = this.signInForm.controls['password'].value.trim();
      this.authService.login(username, password).subscribe(
        (response) => {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('userId', response.id);
          localStorage.setItem('userRole', response.roles);
          localStorage.setItem('userName', response.username);

          const rol = localStorage.getItem('userRole');

          if (rol?.includes("ROLE_ADMIN")) {
            this.router.navigate(['/admin-home']);
          } else {
            this.router.navigate(['/home']);
          }

          console.log('Inicio de sesión exitoso');

          // Verificar si hay un producto pendiente en el carrito después del inicio de sesión
          const pendingCartItem = this.authService.getPendingCartItem();
          if (pendingCartItem) {
            this.cartService.addToCart(pendingCartItem.productId, pendingCartItem.quantity).subscribe(
              (response) => {
                console.log('Producto pendiente añadido al carrito:', response);
                this.authService.clearPendingCartItem(); // Limpiar el producto pendiente después de agregarlo al carrito
                this.cartService.openCart(); // Abrir el carrito después de agregar el producto
              },
              (error) => {
                console.error('Error al agregar producto pendiente al carrito:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          this.errorMessage = error.error.message || 'Error al iniciar sesión.';
          this.snackBar.open(this.errorMessage, 'Cerrar');
        }
      );
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const result = await this.authService.loginWithGoogle();
      const token = await result.user?.getIdToken() || '';
      localStorage.setItem('token', token);
  
      const uid = result.user?.uid || '';
      const email = result.user?.email || '';
      const name = result.user?.displayName || '';
  
      const userData = {
        uid: uid,
        email: email,
        name: name
      };
  
      this.authService.sendUserDataToBackend(userData).subscribe(
        (response) => {
          const userId = response.user._id;
          localStorage.setItem('userId', userId);
  
          const userRole = response.user.roles;
          localStorage.setItem('userRole', userRole);
  
          const userName = response.user.username;
          localStorage.setItem('userName', userName);
  
          if (userRole.includes("ROLE_ADMIN")) {
            this.router.navigate(['/admin-home']);
          } else {
            this.router.navigate(['/home']);
          }
  
          console.log('Inicio de sesión con Google exitoso');
        },
        (error) => {
          console.error('Error al iniciar sesión con Google:', error);
          this.errorMessage = error.message || 'Error al iniciar sesión con Google.';
          this.snackBar.open(this.errorMessage, 'Cerrar');
        }
      );
    } catch (error: any) {
      console.error('Error al iniciar sesión con Google:', error);
      this.errorMessage = error.message || 'Error al iniciar sesión con Google.';
      this.snackBar.open(this.errorMessage, 'Cerrar');
    }
  }
}
