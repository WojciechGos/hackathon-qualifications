import { Component } from '@angular/core';
import { RouterEnum } from 'src/enums/router.enum';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/enums/role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  RouterEnum = RouterEnum;
  RoleEnum = RoleEnum;
  constructor(private authService: AuthService, private router: Router) {}

  user$: Observable<boolean> = this.authService.isLogged$;
  role$: Observable<string | null> = this.authService.userRole$;

  logout() {
    this.authService.logout();
    this.router.navigate([RouterEnum.home]);
  }
}
