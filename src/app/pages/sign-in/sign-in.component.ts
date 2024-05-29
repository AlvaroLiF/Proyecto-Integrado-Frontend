import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string | null = null;
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {
    this.signInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessage = null; // Reset error message before submission

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
            this.router.navigate(['/admin-home'])
          } else {
            this.router.navigate(['/home']);
          }

          console.log(response);

          console.log('Inicio de sesión exitoso');

          
        },
        (error) => {
          console.error('Error al obtener el nombre de usuario:', error);
          this.errorMessage = error.error.message || 'Error al registrar usuario.';
        }
      );
    }

  }

}
