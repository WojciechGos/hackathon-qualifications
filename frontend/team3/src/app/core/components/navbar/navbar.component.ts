import { Component } from '@angular/core';
import { RouterEnum } from 'src/enums/router.enum';
import { AuthService } from '../../services/auth.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
RouterEnum = RouterEnum;
constructor(  
  private authService: AuthService
){}


logout() {
  this.authService.logout();
}

user$: Observable<boolean> = this.authService.isLogged$;
}

