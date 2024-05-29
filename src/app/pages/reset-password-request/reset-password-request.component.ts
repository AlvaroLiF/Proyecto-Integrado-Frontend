import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.css']
})
export class ResetPasswordRequestComponent {
  email: string = '';
  message: string = '';
  emailSent: boolean = false;

  constructor(private authService: AuthService) { }

  sendResetPasswordEmail(): void {
    this.authService.sendResetPasswordEmail(this.email).subscribe(
      () => {
        this.emailSent = true;
        this.message = 'Correo electrónico de restablecimiento de contraseña enviado. Por favor, revise su bandeja de entrada.';
      },
      error => {
        console.error('Error al enviar el correo electrónico de restablecimiento de contraseña:', error);
        this.message = 'Error al enviar el correo electrónico de restablecimiento de contraseña';
      }
    );
  }
}
