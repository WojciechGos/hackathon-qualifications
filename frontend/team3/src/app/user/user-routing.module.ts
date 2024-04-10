import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeamFormComponent } from './components/add-team-form/add-team-form.component';
import { RouterEnum } from 'src/enums/router.enum';

const routes: Routes = [
  {
    path: RouterEnum.addTeam,
    component: AddTeamFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
