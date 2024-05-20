import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {

  users!: any[];

  constructor(private authService: AuthService) { }

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
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  hasAdminRole(user: any): boolean {
    return user.roles.some((role: any) => role.name === 'Admin');
  }

  toggleAdminRole(user: any): void {
    const isAdmin = user.roles.some((role: any) => role.name === 'Admin');
    if (isAdmin) {
      this.authService.removeAdminRole(user._id).subscribe(
        () => this.getUsers(),
        (error) => console.error('Error removing admin role:', error)
      );
    } else {
      this.authService.addAdminRole(user._id).subscribe(
        () => this.getUsers(),
        (error) => console.error('Error adding admin role:', error)
      );
    }
  }

  deleteUser(userId: string): void {
    this.authService.deleteUser(userId).subscribe(
      () => {
        console.log('Producto eliminado exitosamente');
        this.getUsers(); // Actualiza la lista de productos después de eliminar
      },
      error => {
        console.error('Error al eliminar el producto:', error);
      }
    );
  }

  isLast(array: any[], element: any): boolean {
    return array.indexOf(element) === array.length - 1;
  }
  

}
