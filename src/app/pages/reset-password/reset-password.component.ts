import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  resetPassword(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      this.message = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      () => {
        this.passwordReset = true;
        this.message = 'Contraseña restablecida correctamente';
      },
      error => {
        console.error('Error al restablecer la contraseña:', error);
        this.message = 'Error al restablecer la contraseña';
      }
    );
  }

  goToLogin(): void {
    this.router.navigate(['/signin']);
  }
}
