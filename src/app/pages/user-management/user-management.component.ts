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

  isLast(array: any[], element: any): boolean {
    return array.indexOf(element) === array.length - 1;
  }
  

}
