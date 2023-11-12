import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signUpForm: FormGroup;

  constructor(private authService: AuthService) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit(){

    if(this.signUpForm.valid){
      
    const username = this.signUpForm.controls['username'].value.replace(/\s+/g, '');
    const password = this.signUpForm.controls['password'].value.trim();
    this.authService.login(username, password).subscribe(
          (response) => {
            console.log(response);
            // Realizar acciones adicionales según sea necesario, como redirigir a otra página
          },
          (error) => {
            console.error(error);
            // Mostrar un mensaje de error al usuario o tomar otras acciones
          }
        );
      }
    }
  }
