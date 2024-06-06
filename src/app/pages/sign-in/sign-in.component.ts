import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

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
    private router: Router,
    private snackBar: MatSnackBar
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
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          this.errorMessage = error.error.message || 'Error al iniciar sesión.';
          this.snackBar.open(this.errorMessage, 'Cerrar');
        }
      );
    }
  }
}
