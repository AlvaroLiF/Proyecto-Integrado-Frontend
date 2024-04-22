import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {

    if (this.signUpForm.valid) {

      const username = this.signUpForm.controls['username'].value.replace(/\s+/g, '');
      const password = this.signUpForm.controls['password'].value.trim();
      const email = this.signUpForm.controls['email'].value.trim().toLowerCase();

      // Registra al usuario
      this.authService.register(username, password, email).subscribe(
        (response) => {
          console.log(response);
          // Si el registro es exitoso, inicia sesión automáticamente
          this.authService.login(username, password).subscribe(
            (loginResponse) => {
              
              localStorage.setItem('token', loginResponse.accessToken);
              localStorage.setItem('userId', loginResponse.id);
              localStorage.setItem('userRole', loginResponse.roles);
              localStorage.setItem('userName', loginResponse.username);

              const rol = localStorage.getItem('userRole');

              if (rol?.includes("ROLE_ADMIN")) {
                this.router.navigate(['/admin-home'])
              } else {
                this.router.navigate(['/home']);
              }
            },
            (error) => {
              console.error('Error al iniciar sesión:', error);
              // Mostrar un mensaje de error al usuario o tomar otras acciones
            }
          );
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          // Mostrar un mensaje de error al usuario o tomar otras acciones
        }
      );
    }
  }
}









