import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterEnum } from 'src/enums/router.enum';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UnauthGuard } from '../core/guards/unauth.guard';

const routes: Routes = [
  {
    path: RouterEnum.login,
    component: LoginComponent,
    canActivate: [UnauthGuard],
  },
  {
    path: RouterEnum.register,
    component: RegisterComponent,
    canActivate: [UnauthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
