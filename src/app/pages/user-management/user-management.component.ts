import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users!: any[];

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.authService.getUsers().subscribe(
      users => {
        this.users = users;
        console.log(users);
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  hasAdminRole(user: any): boolean {
    return user.roles.some((role: any) => role.name === 'Admin');
  }

  toggleAdminRole(user: any): void {
    const isAdmin = this.hasAdminRole(user);
    if (isAdmin) {
      this.authService.removeAdminRole(user._id).subscribe(
        () => {
          this.getUsers();
          this.snackBar.open('Rol de administrador removido exitosamente', 'Cerrar', { duration: 3000 });
        },
        error => {
          console.error('Error al remover el rol de administrador:', error);
          this.snackBar.open('Error al remover el rol de administrador', 'Cerrar', { duration: 3000 });
        }
      );
    } else {
      this.authService.addAdminRole(user._id).subscribe(
        () => {
          this.getUsers();
          this.snackBar.open('Rol de administrador añadido exitosamente', 'Cerrar', { duration: 3000 });
        },
        error => {
          console.error('Error al añadir el rol de administrador:', error);
          this.snackBar.open('Error al añadir el rol de administrador', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }

  deleteUser(userId: string): void {
    this.authService.deleteUser(userId).subscribe(
      () => {
        console.log('Usuario eliminado exitosamente');
        this.getUsers();
        this.snackBar.open('Usuario eliminado exitosamente', 'Cerrar', { duration: 3000 });
      },
      error => {
        console.error('Error al eliminar el usuario:', error);
        this.snackBar.open('Error al eliminar el usuario', 'Cerrar', { duration: 3000 });
      }
    );
  }

  isLast(array: any[], element: any): boolean {
    return array.indexOf(element) === array.length - 1;
  }
}
