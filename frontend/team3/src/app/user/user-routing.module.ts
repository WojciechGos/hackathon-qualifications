import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterEnum } from 'src/enums/router.enum';
import { AddTeamFormComponent } from './components/add-team-form/add-team-form.component';
import { UserGuard } from '../core/guards/user.guard';

const routes: Routes = [
  {
    path: RouterEnum.addTeam,
    component: AddTeamFormComponent,
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
