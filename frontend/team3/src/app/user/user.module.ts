import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AddTeamFormComponent } from './components/add-team-form/add-team-form.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [AddTeamFormComponent],
  imports: [SharedModule, UserRoutingModule],
})
export class UserModule {}
