import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeamFormComponent } from './components/add-team-form/add-team-form.component';
import { RouterEnum } from 'src/enums/router.enum';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: RouterEnum.addTeam,
    component: AddTeamFormComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
