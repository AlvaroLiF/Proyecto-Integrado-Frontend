import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
errorMessages: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const { username, password, email } = this.signUpForm.value; // Desestructurar los valores del formulario
      this.authService.register(username, password, email).subscribe(
        (response) => {
          console.log(response); // Manejar la respuesta del servidor
          // Realizar acciones adicionales según sea necesario, como redirigir a otra página
        },
        (error) => {
          console.error(error); // Manejar el error de la petición
          // Mostrar un mensaje de error al usuario o tomar otras acciones
        }
      );
    }
  }

}
