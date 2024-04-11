import { Component } from '@angular/core';
import { RouterEnum } from 'src/enums/router.enum';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/enums/role.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  RouterEnum = RouterEnum;
  RoleEnum = RoleEnum;
  constructor(private authService: AuthService) {}

  user$: Observable<boolean> = this.authService.isLogged$;
  role$: Observable<string | null> = this.authService.userRole$;

  logout() {
    this.authService.logout();
  }
}
