import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterEnum } from 'src/enums/router.enum';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path: RouterEnum.admin,
    component: AdminComponent,
  //  canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
