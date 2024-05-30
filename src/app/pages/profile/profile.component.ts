import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: any;
  editingField: string | null = null;
  showPassword = false;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordStep: number = 1;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.authService.getUserProfile(this.authService.getUserId()).subscribe(
      data => {
        this.userProfile = data;
      },
      error => {
        console.error('Error al obtener el perfil del usuario:', error);
        this.snackBar.open('Error al obtener el perfil del usuario', 'Cerrar', { duration: 3000 });
      }
    );
  }

  editField(field: string): void {
    this.editingField = field;
  }

  saveField(): void {
    const userId = this.authService.getUserId();
    const updatedData = {
      username: this.userProfile.username,
      email: this.userProfile.email
    };

    this.authService.updateUserProfile(userId, updatedData).subscribe(
      response => {
        console.log('Perfil actualizado:', response);
        localStorage.setItem('userName', this.userProfile.username); // Actualizar el username en el localStorage
        this.snackBar.open('Perfil actualizado exitosamente', 'Cerrar', { duration: 3000 });
        this.editingField = null;
      },
      error => {
        console.error('Error al actualizar el perfil:', error);
        this.snackBar.open('Error al actualizar el perfil', 'Cerrar', { duration: 3000 });
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  verifyCurrentPassword(): void {
    const userId = this.authService.getUserId();
    this.authService.verifyPassword(userId, { currentPassword: this.currentPassword }).subscribe(
      response => {
        console.log('Contraseña verificada:', response);
        this.snackBar.open('Contraseña verificada', 'Cerrar', { duration: 3000 });
        this.passwordStep = 2;
      },
      error => {
        console.error('Error al verificar la contraseña:', error);
        this.snackBar.open('Error al verificar la contraseña', 'Cerrar', { duration: 3000 });
      }
    );
  }

  updatePassword(): void {
    const userId = this.authService.getUserId();
    if (this.newPassword !== this.confirmPassword) {
      console.error('Las contraseñas nuevas no coinciden');
      this.snackBar.open('Las contraseñas nuevas no coinciden', 'Cerrar', { duration: 3000 });
      return;
    }

    const updatedData = {
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    };

    this.authService.updateUserPassword(userId, updatedData).subscribe(
      response => {
        console.log('Contraseña actualizada:', response);
        this.snackBar.open('Contraseña actualizada exitosamente', 'Cerrar', { duration: 3000 });
        this.passwordStep = 1;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error => {
        console.error('Error al actualizar la contraseña:', error);
        this.snackBar.open('Error al actualizar la contraseña', 'Cerrar', { duration: 3000 });
      }
    );
  }
}
