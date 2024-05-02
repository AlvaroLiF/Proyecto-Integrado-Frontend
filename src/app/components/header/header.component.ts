import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) { }

  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

  getUsername(): string {
    return this.authService.getUsername();
  }

  logOut() {
    this.authService.logOut();
  }

  isAdmin(): boolean{
    return this.authService.isAdmin();
  }

}
