import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RouterEnum } from 'src/enums/router.enum';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLogged$.pipe(
      map((isLogged) => {
        if (isLogged) {
          return this.router.createUrlTree([RouterEnum.home]);
        } else {
          return true;
        }
      })
    );
  }
}
