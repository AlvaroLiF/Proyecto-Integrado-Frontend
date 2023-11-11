import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(private authService: AuthService) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(){

    if(this.signUpForm.valid){
      
    const username = this.signUpForm.controls['username'].value.replace(/\s+/g, '');
    const password = this.signUpForm.controls['password'].value.trim();
    const email = this.signUpForm.controls['email'].value.trim().toLowerCase();
    this.authService.register(username, password, email).subscribe(
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
  
  
  
  
  
  


