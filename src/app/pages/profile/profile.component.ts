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
  editing: boolean = false; // Variable para controlar la edición
  shippingAddresses: any[] = [];


  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.loadShippingAddresses();
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
    this.editing = true; // Establecer editing a true cuando se activa el modo de edición
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
        this.editing = false; // Establecer editing a false cuando se guardan los cambios
      },
      error => {
        console.error('Error al actualizar el perfil:', error);
        this.snackBar.open('Error al actualizar el perfil', 'Cerrar', { duration: 3000 });
      }
    );
  }

  cancelEdit(): void {
    this.editingField = null;
    this.editing = false; // Establecer editing a false cuando se cancela la edición
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

  deleteAccount(): void {
    // Lógica para eliminar la cuenta del usuario
    const userId = this.authService.getUserId();
    this.authService.deleteUser(userId).subscribe(
      response => {
        this.authService.logOut();
        console.log('Cuenta de usuario eliminada:', response);
        // Redirigir al usuario a una página de despedida o cerrar sesión, según tu lógica de aplicación
      },
      error => {
        console.error('Error al eliminar la cuenta de usuario:', error);
        this.snackBar.open('Error al eliminar la cuenta de usuario', 'Cerrar', { duration: 3000 });
      }
    );
  }

  loadShippingAddresses(): void {
    this.authService.getUserShippingAddresses(this.authService.getUserId()).subscribe(
      (addresses) => {
        this.shippingAddresses = addresses.sort((a: { isDefault: number; }, b: { isDefault: number; }) => b.isDefault - a.isDefault);
      },
      (error) => {
        console.error('Error al cargar las direcciones de envío:', error);
      }
    );
  }

  editAddress(address: any): void {
    // Lógica para editar la dirección
  }

  deleteAddress(address: any): void {
    this.authService.deleteUserShippingAddress(this.authService.getUserId(), address._id).subscribe(
      () => {
        this.loadShippingAddresses(); // Recargar las direcciones de envío
      },
      (error) => {
        console.error('Error al eliminar la dirección de envío:', error);
      }
    );
  }

  
}
