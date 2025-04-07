import { Component, inject } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  authService=inject(AuthService);
  router=inject(Router);

  logout(){
    this.authService.logout();
      this.router.navigate(['/login']);
  }

}
