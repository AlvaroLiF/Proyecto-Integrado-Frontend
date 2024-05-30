import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  message: string = '';
  passwordReset: boolean = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  resetPassword(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      this.message = 'Las contraseñas no coinciden';
      this.snackBar.open(this.message, 'Cerrar', { duration: 3000 });
      return;
    }

    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      () => {
        this.passwordReset = true;
        this.message = 'Contraseña restablecida correctamente';
        this.snackBar.open(this.message, 'Cerrar', { duration: 3000 });
      },
      error => {
        console.error('Error al restablecer la contraseña:', error);
        this.message = 'Error al restablecer la contraseña';
        this.snackBar.open(this.message, 'Cerrar', { duration: 3000 });
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  goToLogin(): void {
    this.router.navigate(['/signin']);
  }
}
