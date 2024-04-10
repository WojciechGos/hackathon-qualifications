import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { RoleEnum } from 'src/enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class JuryGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.userRole$.pipe(
      map((role) => {
        return role === RoleEnum.jury;
      })
    );
  }
}
