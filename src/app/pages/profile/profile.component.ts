import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) { }

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
        this.editingField = null;
      },
      error => {
        console.error('Error al actualizar el perfil:', error);
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
        this.passwordStep = 2;
      },
      error => {
        console.error('Error al verificar la contraseña:', error);
      }
    );
  }

  updatePassword(): void {
    const userId = this.authService.getUserId();
    if (this.newPassword !== this.confirmPassword) {
      console.error('Las contraseñas nuevas no coinciden');
      return;
    }

    const updatedData = {
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    };

    this.authService.updateUserPassword(userId, updatedData).subscribe(
      response => {
        console.log('Contraseña actualizada:', response);
        this.passwordStep = 1;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error => {
        console.error('Error al actualizar la contraseña:', error);
      }
    );
  }
}
